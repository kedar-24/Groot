// components/EmailEditor.tsx
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';

const EmailEditor = dynamic(() => import('react-email-editor'), { ssr: false });

export interface MyEmailEditorHandle {
  editor: any; // 'any' type for the Unlayer editor instance
}

const EmailEditorComponent = forwardRef<MyEmailEditorHandle, {}>((props, ref) => {
  const unlayerEditorInstanceRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useImperativeHandle(ref, () => {
    // console.log('EmailEditorComponent: useImperativeHandle is running for parent ref.');
    return {
      get editor() {
        const editorFromUnlayer = unlayerEditorInstanceRef.current?.editor;
        // console.log(`EmailEditorComponent: Parent is requesting 'editor'. Unlayer instance found: ${!!editorFromUnlayer}`);
        return editorFromUnlayer;
      },
    };
  }, []);

  const onLoad = () => {
    // console.log('EmailEditorComponent: onLoad fired (react-email-editor script loaded).');
    setEditorLoaded(true);
    // console.log('EmailEditorComponent: unlayerEditorInstanceRef.current after onLoad:', unlayerEditorInstanceRef.current);
    // if (unlayerEditorInstanceRef.current && unlayerEditorInstanceRef.current.editor) {
    //   console.log('EmailEditorComponent: Unlayer editor instance is AVAILABLE after onLoad!');
    // } else {
    //   console.log('EmailEditorComponent: Unlayer editor instance is NOT YET AVAILABLE after onLoad. Waiting for onReady.');
    // }
  };

  const onReady = () => {
    // console.log('EmailEditorComponent: onReady fired (Unlayer editor is fully initialized and ready for commands).');
    if (unlayerEditorInstanceRef.current && unlayerEditorInstanceRef.current.editor) {
      // console.log('EmailEditorComponent: Unlayer editor instance is FULLY READY after onReady!');
      // unlayerEditorInstanceRef.current.editor.loadDesign({ /* your default design JSON */ });
    } else {
      console.error('EmailEditorComponent: ERROR! Unlayer editor instance is STILL NOT AVAILABLE after onReady.');
    }
  };

  useEffect(() => {
    // console.log('EmailEditorComponent: internal unlayerEditorInstanceRef.current updated:', unlayerEditorInstanceRef.current);
    // if (unlayerEditorInstanceRef.current?.editor) {
    //   console.log('EmailEditorComponent: Unlayer editor property detected on internal ref.');
    // }
  }, [unlayerEditorInstanceRef.current]);

  const renderEditor = typeof window !== 'undefined';

  return (
    // This div needs to correctly consume the height given by its parent in EmailPage.tsx
    // The min-h-[600px] here acts as a fallback if the parent doesn't provide enough height.
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[600px] py-4">
      {/* This inner div is where the react-email-editor iframe actually gets rendered */}
      <div 
        className="w-full h-full border border-gray-300 rounded-lg overflow-hidden relative bg-white"
        style={{ flexGrow: 1, display: 'flex' }} // Important for flex item to grow
      >
        {renderEditor ? (
          <EmailEditor
            ref={unlayerEditorInstanceRef}
            onLoad={onLoad}
            onReady={onReady}
            style={{ width: '100%', height: '100%' }} // CRUCIAL: Makes the iframe fill its parent
            options={{}}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-90 z-10 text-gray-700">
            <p className="text-lg">Preparing editor for client-side...</p>
          </div>
        )}
        {!editorLoaded && renderEditor && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-90 z-10 text-gray-700">
            <svg className="animate-spin h-8 w-8 text-emerald-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg">Loading email editor...</p>
            <p className="text-sm mt-1 text-gray-500">This might take a moment.</p>
          </div>
        )}
      </div>
    </div>
  );
});

EmailEditorComponent.displayName = 'EmailEditorComponent';
export default EmailEditorComponent;