// models/JobPost.js
import mongoose from 'mongoose';

// Regex for basic URL validation
const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/i;
// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required.'],
    trim: true,
    minlength: [5, 'Job title must be at least 5 characters long.'],
    maxlength: [120, 'Job title cannot exceed 120 characters.'],
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required.'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters long.'],
    maxlength: [100, 'Company name cannot exceed 100 characters.'],
  },
  companyLogoPublicId: {
    type: String,
    trim: true,
    maxlength: [255, 'Company logo public ID cannot exceed 255 characters.'],
    default: null,
  },
  attachmentsIds: { // NEW FIELD: Array to store Cloudinary public_ids for attachments
    type: [String], // Array of strings
    default: [],
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters.'],
    default: null,
  },
  isRemote: {
    type: Boolean,
    default: false,
  },
  jobType: {
    type: String,
    enum: {
      values: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'],
      message: '{VALUE} is not a valid job type. Must be Full-time, Part-time, Internship, Contract, or Freelance.',
    },
    required: [true, 'Job type is required.'],
  },
  industry: {
    type: [String],
    default: [],
  },
  experienceLevel: {
    type: String,
    enum: {
      values: ['Entry-level', 'Mid-level', 'Senior', 'Director', 'Executive'],
      message: '{VALUE} is not a valid experience level.',
    },
    default: null,
  },
  description: {
    type: String,
    required: [true, 'Job description is required.'],
    minlength: [50, 'Job description must be at least 50 characters long.'],
    maxlength: [5000, 'Job description cannot exceed 5000 characters.'],
    trim: true,
  },
  applicationLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || urlRegex.test(v);
      },
      message: props => `${props.value} is not a valid application URL!`,
    },
    default: null,
  },
  applicationEmail: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid application email!`,
    },
    default: null,
  },
  applicationInstructions: {
    type: String,
    trim: true,
    maxlength: [1000, 'Application instructions cannot exceed 1000 characters.'],
    default: null,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Poster ID is required.'],
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected', 'expired'],
      message: '{VALUE} is not a valid status.',
    },
    default: 'pending',
    required: true,
  },
  reviewNotes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Review notes cannot exceed 2000 characters.'],
    default: null,
  },
  postedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  expiresAt: {
    type: Date,
    default: function() {
      const thirtyDays = new Date();
      thirtyDays.setDate(thirtyDays.getDate() + 30);
      return thirtyDays;
    },
    index: { expires: '0s' },
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

// Pre-validation hook to ensure at least one application method is provided
jobPostSchema.pre('validate', function(next) {
  if (!this.applicationLink && !this.applicationEmail) {
    this.invalidate('applicationLink', 'At least one application method (link or email) is required.', 'required');
    this.invalidate('applicationEmail', 'At least one application method (link or email) is required.', 'required');
  }
  next();
});

// Add compound index for faster queries on status and postedBy
jobPostSchema.index({ status: 1, postedBy: 1 });
// Add text index for search functionality across multiple fields
jobPostSchema.index({
    title: 'text',
    companyName: 'text',
    description: 'text',
    location: 'text',
    industry: 'text'
}, {
    name: 'job_text_index',
    weights: { title: 10, companyName: 5, description: 3, location: 2, industry: 2 }
});

// Method to soft-delete or mark as expired (optional, for manual expiry)
jobPostSchema.methods.markAsExpired = async function() {
  this.status = 'expired';
  await this.save();
};

export default mongoose.models.JobPost || mongoose.model('JobPost', jobPostSchema);