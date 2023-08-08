import { Component, ViewChild } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TinyMCE Angular';

  @ViewChild('editor') editor!: EditorComponent;

  id: Number = Math.random();
  prevContent: string = '';
  currentContent: string = '';
  noEditTags: number = 0;
  show: boolean = false;
  loaded_variables: boolean = false;
  variablesDocuments = [
    { id: 1, descr: 'EXPEDIENTE_NUMERO' },
    { id: 2, descr: 'DOCUMENTO_CIUDAD' },
    { id: 3, descr: 'DOCUMENTO_ESTADO' },
    { id: 4, descr: 'DOCUMENTO_OFICINA' },
    { id: 5, descr: 'EXPEDIENTE_NOMBRE_DEL_RESPONSABLE' },
    { id: 6, descr: 'EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE' },
    { id: 7, descr: 'OFENDIDO_NOMBRE' },
    { id: 8, descr: 'RELACION_DELITO' },
    { id: 9, descr: 'DOCUMENTO_FECHA' },
    { id: 10, descr: 'DOCUMENTO_HORA' }
  ];

  documentStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    body {
      font-family: Montserrat,Helvetica, Arial, sans-serif;
      font-size: 11pt;
      padding: 4rem;
    }
    .nonedit {
      border: dashed 1px rgba(144, 164, 174,.5);
      background-color: rgb(241, 241, 241);
    }
    .editable{}
    .mce-content-body [contentEditable=false][data-mce-selected] {
      cursor: not-allowed;
      outline: 1px solid rgba(0,0,0,1);
    }
  `;

  plantilla = {
    plantillaid: 1,
    plantilladescr: `<p class="p1" style="text-align: center;"><strong>ORDEN DE INVESTIGACI&Oacute;N A LA POLIC&Iacute;A MINISTERIAL</strong></p><p class="p2">&nbsp;</p><p class="p3" style="text-align: right;"><strong>No. de Caso:<span class="Apple-converted-space">&nbsp; EXPEDIENTE_NUMERO</span></strong></p><p class="p2">&nbsp;</p><p class="p4"><strong>Lugar:</strong> DOCUMENTO_CIUDAD, DOCUMENTO_ESTADO<br><strong>Fecha:</strong><span class="Apple-converted-space">&nbsp; DOCUMENTO_FECHA</span>,<span class="Apple-converted-space">&nbsp; </span>Hora: DOCUMENTO_HORA<br><strong>Unidad de Investigaci&oacute;n:</strong> DOCUMENTO_OFICINA<br><strong>Agente del Ministerio P&Uacute;blico:</strong> EXPEDIENTE_NOMBRE_DEL_RESPONSABLE<br><strong>Agente de la Polic&iacute;a Ministerial Asignado:</strong><span class="Apple-converted-space">&nbsp; EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE<br><br></span>S&iacute;rvase llevar a cabo exhaustiva investigaci&oacute;n de los hechos denunciados dentro del n&uacute;mero de caso antes citado, debiendo informar a esta fiscal&iacute;a del resultado de la misma, en un per&iacute;odo de <span class="s1"><strong>30 d&iacute;as</strong></span>, esto con la finalidad de esclarecer los hechos denunciados por el <strong>OFENDIDO_NOMBRE</strong> por la probable comisi&oacute;n del delito de RELACION_DELITO. Lo anterior con fundamento en lo dispuesto por los art&iacute;culos 127, 131, 132 y dem&aacute;s relativos del C&oacute;digo Nacional de Procedimientos Penales y dem&aacute;s ordenamientos legales aplicables.</p><p class="p7">&nbsp;</p><p class="p1" style="text-align: center;">EL AGENTE DEL MINISTERIO P&Uacute;BLICO:</p><p class="p7" style="text-align: center;">&nbsp;</p><p class="p1" style="text-align: center;">________________________________________</p><p class="p1" style="text-align: center;">LIC. EXPEDIENTE_NOMBRE_DEL_RESPONSABLE<br>AGENTE DEL MINISTERIO P&Uacute;BLICO TITULAR DE LA<br>DOCUMENTO_OFICINA</p>`,
    variables: [
      { id: 1, descr: 'EXPEDIENTE_NUMERO', contenido: '0201-2023-00003/NUC', borrable: 'N', },
      { id: 2, descr: 'DOCUMENTO_CIUDAD', contenido: 'ENSENADA', borrable: 'N', },
      { id: 3, descr: 'DOCUMENTO_ESTADO', contenido: 'BAJA CALIFORNIA', borrable: 'N', },
      { id: 4, descr: 'DOCUMENTO_OFICINA', contenido: 'UNIDAD DE DELITOS SEXUALES', borrable: 'N', },
      { id: 5, descr: 'EXPEDIENTE_NOMBRE_DEL_RESPONSABLE', contenido: 'MAYRA PATRICIA LOPEZ NAVARRO', borrable: 'N', },
      { id: 6, descr: 'EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE', contenido: 'EVELYN CAMPOS MEZA', borrable: 'N', },
      { id: 7, descr: 'OFENDIDO_NOMBRE', contenido: 'C. MICHAEL ORTIZ MOLINA', borrable: 'N', },
      { id: 8, descr: 'RELACION_DELITO', contenido: 'VIOLENCIA FAMILIAR EQUIPARADA', borrable: 'N', },
      { id: 9, descr: 'DOCUMENTO_FECHA', contenido: '03 DE ENERO DEL 2023', borrable: 'S', },
      { id: 10, descr: 'DOCUMENTO_HORA', contenido: '11:43 HRS.', borrable: 'S', },
    ],
    variablesUpdate: [
      { id: 1, descr: 'EXPEDIENTE_NUMERO', contenido: '0201-2023-00003/RAC UJAP', borrable: 'N', },
      { id: 2, descr: 'DOCUMENTO_CIUDAD', contenido: 'MEXICALI', borrable: 'N', },
      { id: 3, descr: 'DOCUMENTO_ESTADO', contenido: 'BAJA CALIFORNIA', borrable: 'N', },
      { id: 4, descr: 'DOCUMENTO_OFICINA', contenido: 'UNIDAD DE DELITOS SEXUALES', borrable: 'N', },
      { id: 5, descr: 'EXPEDIENTE_NOMBRE_DEL_RESPONSABLE', contenido: 'ABDIEL OTONIEL FLORES GONZÁLEZ', borrable: 'N', },
      { id: 6, descr: 'EXPEDIENTE_NOMBRE_DEL_AGENTE_RESPONSABLE', contenido: 'POLICIA NUEVO', borrable: 'N', },
      { id: 7, descr: 'OFENDIDO_NOMBRE', contenido: 'C. MICHAEL ORTIZ MOLINA', borrable: 'N', },
      { id: 8, descr: 'RELACION_DELITO', contenido: 'VIOLENCIA FAMILIAR EQUIPARADA', borrable: 'N', },
      { id: 9, descr: 'DOCUMENTO_FECHA', contenido: '03 DE ENERO DEL 2023', borrable: 'S', },
      { id: 10, descr: 'DOCUMENTO_HORA', contenido: '11:43 HRS.', borrable: 'S', },
    ],
  };

  tinymceInitOptions = {
    selector: 'div',
    menu: {
      file: { title: 'Archivo', items: '' },
      edit: { title: 'Editar', items: 'cut copy paste pastetext | selectall' },
      view: { title: 'Ver', items: 'code wordcount' },
      insert: { title: 'Insertar', items: '' },
      format: { title: 'Formato', items: 'bold italic underline strikethrough superscript subscript | styles fontsize align lineheight | removeformat', },
      table: { title: 'Tablas', items: 'inserttable | cell row column | advtablesort | tableprops deletetable', },
      variables: { title: 'Variables', items: 'add_variable load_variables update_variables' },
      options: { title: 'Opciones', items: 'save final_print sign_online' },
    },
    menubar: 'file edit insert view format table variables options',
    plugins: 'lists link image table code wordcount searchreplace codesample',
    toolbar: 'undo redo | alignleft aligncenter alignright alignjustify | bold italic | bullist numlist outdent indent | options',
    content_style: this.documentStyles,
    browser_spellcheck: true,
    height: 768,
    content_css: 'document',
    noneditable_class: 'nonedit',
    editable_class: 'editable',
    promotion: false,
    base_url: '/tinymce',
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
          this.mostrarSelectVariable(editor);
        }
      });

      editor.ui.registry.addMenuItem('load_variables', {
        text: 'Cargar variables iniciales',
        icon: 'upload',
        disabled: true,
        onAction: () => {
          if (!this.loaded_variables) {
            this.prevContent = this.loadVariablesTemplate(this.plantilla.variables, this.currentContent);
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
          this.currentContent = this.updateVariablesTemplate(this.plantilla.variablesUpdate, this.currentContent);
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
    this.prevContent = this.plantilla.plantilladescr;
    this.currentContent = this.prevContent;
    this.noEditTags = this.countNoEditableTags(this.prevContent);
  }

  countNoEditableTags(content: string) {
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = content;
    return tempContainer.getElementsByClassName('nonedit').length;
  }

  handlerSelectionChange(event: any) {
    if (this.countNoEditableTags(this.currentContent) < this.noEditTags) {
      this.currentContent = this.prevContent;
      console.error('No puedes eliminar variables no borrables');
    }
  }

  handlerKeyDown(event: any) {
    this.setPrevContent(event.editor);
  }

  handlerMouseDown(event: any) {
    this.setPrevContent(event.editor);
  }

  setPrevContent(editor: any) {
    this.prevContent = editor.getContent();
  }

  loadVariablesTemplate(variables: any, plantilla: string) {
    let copyPlantilla = plantilla;
    variables.forEach((element: any) => {
      const regex = new RegExp(element.descr, 'g');
      copyPlantilla = copyPlantilla.replace(regex, `<span class="${element.descr} ${element.borrable == 'N' ? 'nonedit' : 'editable'}" >${element.contenido}</span>`);
    });
    return copyPlantilla;
  }

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

  mostrarSelectVariable(editor: any) {
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
        this.insertarVariableEnEditor(editor, selectedVariable);
      }
    });
  }


  insertarVariableEnEditor(editor: any, variable: string) {
    if (editor) {
      editor.insertContent(variable);
      this.currentContent = editor.getContent();
    }
  }
}
