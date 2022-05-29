import { AngularEditorConfig } from "@kolkov/angular-editor";

export class AppContants {

    public static minWidthPhone: number = 1140;

    // Routes
    public static HOME_PATH = '/home';
    public static LOGIN_PATH = '/login';
    public static LOGOUT_PATH = '/logout';
    public static NO_PERMISION_PATH = '/no-permision'
    public static PATRON_PATH = '/patron';
    public static BUSCADOR_PATH = `${AppContants.PATRON_PATH}/buscador`;
    public static PATRON_DETALLES_PATH = `${AppContants.PATRON_PATH}/detalles`;
    public static PATRON_ADMINISTRAR_PATH = `${AppContants.PATRON_PATH}/administracion`;
    public static PATRON_CREAR_PATH = `${AppContants.PATRON_ADMINISTRAR_PATH}/crear`;
    public static USUARIO_PATH = '/usuario';
    public static USUARIO_DETALLES_PATH = `${AppContants.USUARIO_PATH}/detalles`;
    public static USUARIO_ADMINISTRAR_PATH = `${AppContants.USUARIO_PATH}/administracion`;
    public static GRUPO_PATH = '/grupo'
    public static GRUPO_ADMINISTRAR_PATH = `${AppContants.GRUPO_PATH}/administracion`;
    public static GRUPO_CREAR_PATH = `${AppContants.GRUPO_ADMINISTRAR_PATH}/crear`;
    public static GRUPO_DETALLES_PATH = `${AppContants.GRUPO_ADMINISTRAR_PATH}/detalles`;
    public static EJERCICIO_PATH = '/ejercicio'
    public static EJERCICIO_ADMINISTRAR_PATH = `${AppContants.EJERCICIO_PATH}/administracion`;
    public static EJERCICIO_CREAR_PATH = `${AppContants.EJERCICIO_ADMINISTRAR_PATH}/crear`;
    public static EJERCICIO_DETALLES_PATH = `${AppContants.EJERCICIO_ADMINISTRAR_PATH}/detalles`;
    public static EJERCICIO_ESTADÍSTICAS_PATH = `${AppContants.EJERCICIO_PATH}/estadisticas`;

    // Apis URLS
    public static URL_API = 'http://localhost:8080/api';

    public static URL_API_PATRON = `${AppContants.URL_API}/patron`;
    public static URL_API_PATRON_ALL = `${AppContants.URL_API_PATRON}/alumno`
    public static URL_API_PATRON_PROFE = `${AppContants.URL_API_PATRON}/profesor`
    public static URL_API_USUARIO = `${AppContants.URL_API}/usuario`;
    public static URL_API_USUARIO_ALL = `${AppContants.URL_API_USUARIO}/alumno`;
    public static URL_API_USUARIO_PROFE = `${AppContants.URL_API_USUARIO}/profesor`;
    public static URL_API_USUARIO_ADMIN = `${AppContants.URL_API_USUARIO}/administrador`;
    public static URL_API_GRUPO = `${AppContants.URL_API}/grupo`
    public static URL_API_GRUPO_ALL = `${AppContants.URL_API_GRUPO}/alumno`;
    public static URL_API_GRUPO_PROFE = `${AppContants.URL_API_GRUPO}/profesor`;
    public static URL_API_PLANTILLA = `${AppContants.URL_API_USUARIO}/plantilla`;
    public static URL_API_EJERCIO = `${AppContants.URL_API}/ejercicio`;
    public static URL_API_EJERCIO_ALL = `${AppContants.URL_API_EJERCIO}/alumno`;
    public static URL_API_EJERCIO_PROFE = `${AppContants.URL_API_EJERCIO}/profesor`;
    public static URL_API_EJERCIO_ADMIN = `${AppContants.URL_API_EJERCIO}/administrador`;
    public static RESULTADO_PATH = `${AppContants.URL_API}/resultado`;
    public static URL_API_RESULTADO_ALL = `${AppContants.RESULTADO_PATH}/alumno`;
    public static URL_API_RESULTADO_PROFE = `${AppContants.RESULTADO_PATH}/profesor`;
    public static URL_API_RESULTADO_ADMIN = `${AppContants.RESULTADO_PATH}/administrador`;

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

    // URI to images
    public static URI_PROFILE_IMAGE = '/assets/images/person-outline.png'

    // Rol variables
    public static ROLES: any = { 1: 'Alumno', 2: 'Profesor', 3: 'Administrador'}
    public static ROL_ALUMNO: number = 1;
    public static ROL_PROFESOR: number = 2;
    public static ROL_ADMINISTRADOR: number = 3;
}