import { PdfViewerProps } from '@/models';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Import styles
import {
  highlightPlugin,
  RenderHighlightsProps,
  Trigger,
} from '@react-pdf-viewer/highlight';
import { searchPlugin } from '@react-pdf-viewer/search';

export default function PdfViewer({ docURL, cleanedResults }: PdfViewerProps) {
  const pageHeight = 842; // If units are in points
  const pageWidth = 595;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {cleanedResults &&
        cleanedResults
          .filter((area) => {
            // console.log(area);

            return area.pageIndex === props.pageIndex;
          })
          .map((area, idx) => (
            <div
              key={idx}
              className="highlight-area"
              style={Object.assign(
                {},
                {
                  background: 'yellow',
                  opacity: 0.5,
                },
                // Calculate the position
                // to make the highlight area displayed at the desired position
                // when users zoom or rotate the document
                props.getCssProperties(area, props.rotation)
              )}
            />
          ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlights,
    trigger: Trigger.None,
  });

  const searchPluginInstance = searchPlugin({
    // keyword: changes
    //   .map((change) => {
    //     if (
    //       change.highlighted_phrases_from_version_1[0] !== null &&
    //       change.highlighted_phrases_from_version_1[0] !== undefined
    //     ) {
    //       return change.highlighted_phrases_from_version_1[0];
    //     }
    //     // Return something else if null, or skip processing.
    //     return null; // Alternatively, you can filter out null entries later.
    //   })
    //   .filter((item) => item !== null), // Filter out the null values after mapping
  });

  return docURL ? (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
    >
      <Viewer
        fileUrl={docURL}
        plugins={[
          defaultLayoutPluginInstance,
          searchPluginInstance,
          highlightPluginInstance,
        ]}
      />
    </Worker>
  ) : (
    <p>No doc available</p>
  );
}
