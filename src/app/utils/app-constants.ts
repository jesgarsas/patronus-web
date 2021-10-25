import { AngularEditorConfig } from "@kolkov/angular-editor";

export class AppContants {

    public static minWidthPhone: number = 1140;

    // Apis URLS
    public static URL_API = 'http://localhost:8080/api';

    public static URL_API_PATRON = `${AppContants.URL_API}/patron`;
    public static URL_API_PATRON_ALL = `${AppContants.URL_API_PATRON}/alumno`
    public static URL_API_PATRON_PROFE = `${AppContants.URL_API_PATRON}/profesor`
    public static URL_API_USUARIO = `${AppContants.URL_API}/usuario`;
    public static URL_API_USUARIO_ALL = `${AppContants.URL_API}/alumno`;
    public static URL_API_USUARIO_PROFE = `${AppContants.URL_API}/profesor`;
    public static URL_API_USUARIO_ADMIN = `${AppContants.URL_API}/administrador`;

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

    public static validFormatFile: string = '.zip, .7z, .rar, .tar, .gz, .gzip, .pdf, .txt, .doc, .docx';

    // Rol variables
    public static ROLES: any = { 1: 'Alumno', 2: 'Profesor', 3: 'Administrador'}
    public static ROL_ALUMNO: number = 1;
    public static ROL_PROFESOR: number = 2;
    public static ROL_ADMINISTRADOR: number = 3;
}