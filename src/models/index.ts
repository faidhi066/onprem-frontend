import { HighlightArea } from '@react-pdf-viewer/search';

export interface Change {
  old_section_no: string | null;
  new_section_no: string | null;
  section: string;
  difference: string;
  impact: string;
  highlighted_phrases_from_version_1: string[];
  highlighted_phrases_from_version_2: string[];
}

export interface ChangesResponse {
  data: Change[];
  highlighted_rect1: number[][];
  highlighted_rect2: number[][];
}

export interface Impact {
  section: string;
  impact: string;
  recommended_actions: string;
  highlighted_phrases: string[];
}

export interface ImpactResponse {
  data: Impact[];
  highlighted_rect1: number[][];
}

export interface FormsetDocumentProps {
  doc1: File;
  doc2: File;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PdfViewerProps {
  docURL: string | null;
  cleanedResults: HighlightArea[] | null;
  // cleanedResults: number[][];
}
