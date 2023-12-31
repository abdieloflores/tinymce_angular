import { Component } from '@angular/core';
import Swal from 'sweetalert2';

// Define enums for ToolbarLocation and ToolbarMode
enum ToolbarLocation {
  Top = 'top',
  Bottom = 'bottom',
  Auto = 'auto'
}

enum ToolbarMode {
  Floating = 'floating',
  Sliding = 'sliding',
  Scrolling = 'scrolling',
  Wrap = 'wrap',
}

// Define the Event interface
interface Event {
  event: any,
  editor: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TinyMCE Angular';

  id: Number = Math.random();
  prevContent: string = '';
  currentContent: string = '';
  noEditTags: number = 0;
  show: boolean = false;
  loaded_variables: boolean = false;

  // List of variables with descriptions
  variablesDocuments = [
    { id: 1, descr: '{{EXPEDIENTE_NUMERO}}' },
    { id: 2, descr: '{{DOCUMENTO_CIUDAD}}' },
    { id: 3, descr: '{{DOCUMENTO_ESTADO}}' },
    { id: 4, descr: '{{DOCUMENTO_OFICINA}}' },
    { id: 5, descr: '{{EXPEDIENTE_NOMBRE_DEL_RESPONSABLE}}' },
    { id: 6, descr: '{{EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE}}' },
    { id: 7, descr: '{{OFENDIDO_NOMBRE}}' },
    { id: 8, descr: '{{RELACION_DELITO}}' },
    { id: 9, descr: '{{DOCUMENTO_FECHA}}' },
    { id: 10, descr: '{{DOCUMENTO_HORA}}' }
  ];

  // CSS styles for the document in tinymce
  documentStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  body {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    font-size: 10pt;
    padding: .5in 1in .5in 1in;
    max-width: 21.59cm;
    min-width: 21.59cm;
  }
  .nonedit {
    border: dashed 1px rgba(144, 164, 174, 0.5);
    background-color: rgb(241, 241, 241);
  }
  .editable {
  }
  .mce-content-body [contentEditable="false"][data-mce-selected] {
    cursor: not-allowed;
    outline: 1px solid rgba(0, 0, 0, 1);
  }
  `;

  // Template object containing template information
  template = {
    plantillaid: 1,
    header: `<table id="header" contenteditable="false" style="border: 2px solid rgb(165, 165, 165); width: 100%; height: 1in; background-color: rgb(228, 228, 228);"> <tbody> <tr> <td style="text-align: center; width: 20%;"><img style="max-height: 0.9in; width: auto;" src="https://cdtec.fgebc.gob.mx/cdtec/assets/img/FGEBC.png" alt="Logo FGEBC"></td> <td style="text-align: center; font-weight: bold; text-transform: uppercase; padding: 10px; width: 50%;">Fiscal&iacute;a General del Estado de <br>Baja California</td> <td style="text-align: center; width: 20%;">&nbsp;</td> </tr> </tbody> </table>`,
    templatedescr: `<p class="p1" style="text-align: center;"><strong>ORDEN DE INVESTIGACI&Oacute;N A LA POLIC&Iacute;A MINISTERIAL</strong></p><p class="p1" style="text-align: center;">&nbsp;</p><p class="p3" style="text-align: right;"><strong>No. de Caso:<span class="Apple-converted-space">&nbsp; {{EXPEDIENTE_NUMERO}}</span></strong></p><p class="p2">&nbsp;</p><p class="p4" style="text-align: left;"><strong>Lugar:</strong> {{DOCUMENTO_CIUDAD}}, {{DOCUMENTO_ESTADO}}<br><strong>Fecha:</strong><span class="Apple-converted-space">&nbsp; {{DOCUMENTO_FECHA}}</span>,<span class="Apple-converted-space">&nbsp; </span>Hora: {{DOCUMENTO_HORA}}<br><strong>Unidad de Investigaci&oacute;n:</strong> {{DOCUMENTO_OFICINA}}<br><strong>Agente del Ministerio P&Uacute;blico:</strong> {{EXPEDIENTE_NOMBRE_DEL_RESPONSABLE}}<br><strong>Agente de la Polic&iacute;a Ministerial Asignado:</strong><span class="Apple-converted-space">&nbsp; {{EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE}}</span></p><p class="p4" style="text-align: left;">&nbsp;</p><p class="p4" style="text-align: justify;">S&iacute;rvase llevar a cabo exhaustiva investigaci&oacute;n de los hechos denunciados dentro del n&uacute;mero de caso antes citado, debiendo informar a esta fiscal&iacute;a del resultado de la misma, en un per&iacute;odo de <span class="s1"><strong>30 d&iacute;as</strong></span>, esto con la finalidad de esclarecer los hechos denunciados por el <strong>{{OFENDIDO_NOMBRE}}</strong> por la probable comisi&oacute;n del delito de {{RELACION_DELITO}}. Lo anterior con fundamento en lo dispuesto por los art&iacute;culos 127, 131, 132 y dem&aacute;s relativos del C&oacute;digo Nacional de Procedimientos Penales y dem&aacute;s ordenamientos legales aplicables.</p><p class="p1" style="text-align: center;">&nbsp;</p><p class="p1" style="text-align: center;">&nbsp;</p><p class="p1" style="text-align: center;">EL AGENTE DEL MINISTERIO P&Uacute;BLICO:</p><p class="p7" style="text-align: center;">&nbsp;</p><p class="p1" style="text-align: center;">________________________________________</p><p class="p1" style="text-align: center;">LIC. {{EXPEDIENTE_NOMBRE_DEL_RESPONSABLE}}<br>AGENTE DEL MINISTERIO P&Uacute;BLICO TITULAR DE LA<br>{{DOCUMENTO_OFICINA}}</p>`,
    variables: [
      { id: 1, descr: '{{EXPEDIENTE_NUMERO}}', contenido: '0201-2023-00003/NUC', borrable: 'N', },
      { id: 2, descr: '{{DOCUMENTO_CIUDAD}}', contenido: 'ENSENADA', borrable: 'N', },
      { id: 3, descr: '{{DOCUMENTO_ESTADO}}', contenido: 'BAJA CALIFORNIA', borrable: 'N', },
      { id: 4, descr: '{{DOCUMENTO_OFICINA}}', contenido: 'UNIDAD DE DELITOS SEXUALES', borrable: 'N', },
      { id: 5, descr: '{{EXPEDIENTE_NOMBRE_DEL_RESPONSABLE}}', contenido: 'MAYRA PATRICIA LOPEZ NAVARRO', borrable: 'N', },
      { id: 6, descr: '{{EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE}}', contenido: 'EVELYN CAMPOS MEZA', borrable: 'N', },
      { id: 7, descr: '{{OFENDIDO_NOMBRE}}', contenido: 'C. MICHAEL ORTIZ MOLINA', borrable: 'N', },
      { id: 8, descr: '{{RELACION_DELITO}}', contenido: 'VIOLENCIA FAMILIAR EQUIPARADA', borrable: 'N', },
      { id: 9, descr: '{{DOCUMENTO_FECHA}}', contenido: '03 DE ENERO DEL 2023', borrable: 'S', },
      { id: 10, descr: '{{DOCUMENTO_HORA}}', contenido: '11:43 HRS.', borrable: 'S', },
    ],
    variablesUpdate: [
      { id: 1, descr: '{{EXPEDIENTE_NUMERO}}', contenido: '0201-2023-00003/RAC UJAP', borrable: 'N', },
      { id: 2, descr: '{{DOCUMENTO_CIUDAD}}', contenido: 'MEXICALI', borrable: 'N', },
      { id: 3, descr: '{{DOCUMENTO_ESTADO}}', contenido: 'BAJA CALIFORNIA', borrable: 'N', },
      { id: 4, descr: '{{DOCUMENTO_OFICINA}}', contenido: 'UNIDAD DE DELITOS SEXUALES', borrable: 'N', },
      { id: 5, descr: '{{EXPEDIENTE_NOMBRE_DEL_RESPONSABLE}}', contenido: 'ABDIEL OTONIEL FLORES GONZÁLEZ', borrable: 'N', },
      { id: 6, descr: '{{EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE}}', contenido: 'POLICIA NUEVO', borrable: 'N', },
      { id: 7, descr: '{{OFENDIDO_NOMBRE}}', contenido: 'C. MICHAEL ORTIZ MOLINA', borrable: 'N', },
      { id: 8, descr: '{{RELACION_DELITO}}', contenido: 'VIOLENCIA FAMILIAR EQUIPARADA', borrable: 'N', },
      { id: 9, descr: '{{DOCUMENTO_FECHA}}', contenido: '03 DE ENERO DEL 2023', borrable: 'S', },
      { id: 10, descr: '{{DOCUMENTO_HORA}}', contenido: '11:43 HRS.', borrable: 'S', },
    ],
  };

  // TinyMCE configuration options
  tinymceInitOptions = {
    // Define the selector for the target element where TinyMCE will be initialized
    selector: 'div',

    table_default_attributes: {
      border: '2'
    },

    // Define the menu options for the editor
    menu: {
      file: { title: 'Archivo', items: 'export print' },
      edit: { title: 'Editar', items: 'cut copy paste pastetext | selectall' },
      view: { title: 'Ver', items: 'code wordcount' },
      insert: { title: 'Insertar', items: '' },
      format: { title: 'Formato', items: 'bold italic underline strikethrough superscript subscript | styles fontsize align lineheight | removeformat', },
      table: { title: 'Tablas', items: 'inserttable | cell row column | advtablesort | tableprops deletetable', },
      variables: { title: 'Variables', items: 'add_variable load_variables update_variables' },
      options: { title: 'Opciones', items: 'save final_print sign_online' },
    },

    // Define the menu bar layout
    menubar: 'file edit insert view format table variables options',

    // Define the plugins to be used in the editor
    plugins: 'lists link image table code wordcount searchreplace codesample code',

    // Define the toolbar layout
    toolbar: 'undo redo | alignleft aligncenter alignright alignjustify | bold italic | bullist numlist outdent indent | code',

    // Define the location of the toolbar (auto will adapt based on the screen size)
    toolbar_location: ToolbarLocation.Auto,

    // Define the mode for the toolbar (sliding mode hides the toolbar until it's activated)
    toolbar_mode: ToolbarMode.Sliding,

    // Define the configuration for the mobile view
    mobile: {
      menu: {
        file: { title: 'Archivo', items: 'export print' },
        edit: { title: 'Editar', items: 'cut copy paste pastetext | selectall' },
        view: { title: 'Ver', items: 'code wordcount' },
        insert: { title: 'Insertar', items: '' },
        format: { title: 'Formato', items: 'bold italic underline strikethrough superscript subscript | styles fontsize align lineheight | removeformat', },
        table: { title: 'Tablas', items: 'inserttable | cell row column | advtablesort | tableprops deletetable', },
        variables: { title: 'Variables', items: 'add_variable load_variables update_variables' },
        options: { title: 'Opciones', items: 'save final_print sign_online' },
      },
      menubar: 'file edit insert view format table variables options',
      plugins: 'lists link image table code wordcount searchreplace codesample code',
      toolbar: 'undo redo | alignleft aligncenter alignright alignjustify | bold italic | bullist numlist outdent indent | code',
      toolbar_location: ToolbarLocation.Auto,
      toolbar_mode: ToolbarMode.Sliding,
    },

    // Define the CSS styles for the content
    content_style: this.documentStyles,

    // Enable browser spellcheck
    browser_spellcheck: true,

    // Set the height of the editor
    height: 768,

    // Define the CSS file to be used for content rendering
    content_css: 'document',

    // Define the class name for non-editable elements
    noneditable_class: 'nonedit',

    // Regular expression to match {{VARIABLE}} tags
    // noneditable_regexp: /{{([^}}]+)?}}/g,

    // Define the class name for editable elements
    editable_class: 'editable',

    // Disable promotion of the editor to premium features
    promotion: false,

    // Set the base URL for TinyMCE files
    base_url: '/tinymce',

    // Define the suffix for TinyMCE files
    suffix: '.min',
    setup: (editor: any) => {
      editor.ui.registry.addMenuItem('save', {
        text: 'Agregar documento al expediente',
        icon: 'save',
        disabled: true,
        onAction: () => {
          alert('Agregar documento al expediente.');
        }
      });

      editor.ui.registry.addMenuItem('add_variable', {
        text: 'Agregar variable',
        icon: 'plus',
        disabled: true,
        onAction: () => {
          this.showSelectVariable(editor);
        }
      });

      editor.ui.registry.addMenuItem('load_variables', {
        text: 'Cargar variables iniciales',
        icon: 'upload',
        disabled: true,
        onAction: () => {
          if (!this.loaded_variables) {
            this.prevContent = this.loadVariablesTemplate(this.template.variables, this.currentContent);
            this.currentContent = this.prevContent;
            this.noEditTags = this.countNoEditableTags(this.prevContent);
            editor.setContent(this.currentContent);
            this.loaded_variables = true;
          } else { alert('Ya se cargarón las variables iniciales') }
        }
      });

      editor.ui.registry.addMenuItem('update_variables', {
        text: 'Actualizar variables',
        icon: 'reload',
        disabled: true,
        onAction: () => {
          this.currentContent = this.updateVariablesTemplate(this.template.variablesUpdate, this.currentContent);
          editor.setContent(this.currentContent);
        }
      });

      editor.ui.registry.addMenuItem('sign_online', {
        text: 'Firmar documento',
        icon: 'edit-block',
        disabled: true,
        onAction: () => {
          alert('Firmando documento');
        }
      });

      editor.ui.registry.addMenuItem('final_print', {
        text: 'Impresión definitiva',
        icon: 'print',
        disabled: true,
        onAction: () => {
          alert('Se hará una impresión definitiva del documento');
        }
      });
    }
  };

  ngOnInit() {
    // Initialize content and count non-editable tags
    this.prevContent = this.template.header + this.template.templatedescr;
    this.currentContent = this.prevContent;
    this.noEditTags = this.countNoEditableTags(this.prevContent);
  }

  // Function to count the number of non-editable tags in the content
  countNoEditableTags(content: string) {
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = content;
    return tempContainer.getElementsByClassName('nonedit').length;
  }

  // Event handler for selection change in the editor
  handlerSelectionChange(event: Event) {
    if (this.countNoEditableTags(this.currentContent) < this.noEditTags) {
      this.currentContent = this.prevContent;
    }
  }

  // Event handler for keydown event in the editor
  handlerKeyDown(event: Event) {
    this.setPrevContent(event.editor);
  }

  // Event handler for mousedown event in the editor
  handlerMouseDown(event: Event) {
    const editor = event.editor;
    this.setPrevContent(editor);
  }

  // Function to set the previous content of the editor
  setPrevContent(editor: any) {
    this.prevContent = editor.getContent();
  }

  // Function to load variables into the template
  loadVariablesTemplate(variables: any, plantilla: string) {
    let copyPlantilla = plantilla;
    variables.forEach((element: any) => {
      const regex = new RegExp(element.descr, 'g');
      copyPlantilla = copyPlantilla.replace(regex, `<span class="${element.descr} ${element.borrable == 'N' ? 'nonedit' : 'editable'}" >${element.contenido}</span>`);
    });
    return copyPlantilla;
  }

  // Function to update variables in the template
  updateVariablesTemplate(variables: any, html: string) {
    let returnHTML = '';
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;
    variables.forEach((element: any) => {
      Array.from(tempContainer.getElementsByClassName(element.descr)).forEach(
        (variable: Element) => {
          variable.innerHTML = element.contenido;
        }
      );
    });

    Array.from(tempContainer.children).forEach((child: Element) => {
      returnHTML += child.outerHTML;
    });

    return returnHTML;
  }

  // Function to show a select variable dialog
  showSelectVariable(editor: any) {
    const opcionesSelect: Record<string, string> = {};
    this.variablesDocuments.forEach((variable) => {
      opcionesSelect[variable.descr] = variable.descr;
    });

    Swal.fire({
      title: 'Selecciona una variable',
      input: 'select',
      inputOptions: opcionesSelect,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const selectedVariable = result.value;
        this.insertVariableInEditor(editor, selectedVariable);
      }
    });
  }

  // Function to insert a variable in the editor
  insertVariableInEditor(editor: any, variable: string) {
    if (editor) {
      editor.insertContent(variable);
      this.currentContent = editor.getContent();
    }
  }
}
