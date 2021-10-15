import { AngularEditorConfig } from "@kolkov/angular-editor";

export class AppContants {

    public static minWidthPhone: number = 1140;

    // Apis URLS
    public static URL_API = 'http://localhost:8080/api'

    public static URL_API_PATRON = `${AppContants.URL_API}/patron`

    // Configurations
    public static editorConfig: AngularEditorConfig = {
        editable: true,
          spellcheck: true,
          height: 'auto',
          minHeight: '250px',
          maxHeight: 'auto',
          width: 'auto',
          minWidth: '0',
          translate: 'yes',
          enableToolbar: true,
          showToolbar: true,
          placeholder: 'El patrón...',
          defaultParagraphSeparator: '',
          defaultFontName: '',
          defaultFontSize: '',
          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
          ['fontSize', 'insertImage',
          'insertVideo',]
        ]
    };
}