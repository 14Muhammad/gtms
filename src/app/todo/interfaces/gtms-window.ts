export interface GTMSWindow  extends Window {
  speechSynthesis?: any;
  SpeechSynthesisUtterance?: any;

  SpeechRecognition?:any;
  SpeechGrammarList?:any;
  SpeechRecognitionEvent?:any;

  webkitSpeechRecognition?:any;
  webkitSpeechRecognitionEvent?:any;
  webkitSpeechGrammarList?:any;
}
