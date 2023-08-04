import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TinyMCE Angular';
  disabled: boolean = false;
  id: Number = Math.random();
  documentStyles = `
  body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    padding: 4rem;
  }
  .nonedit {
    border: dashed 1px red;
    background-color: rgb(255, 234, 234);
  }
  .editable{
    border: dashed 1px rgb(144, 164, 174);
    background-color: rgb(226, 226, 226);
  }
  `;
  plantilla = {
    plantillaid: 1,
    plantilladescr: `<p class="p1" style="text-align: center;"><strong>ORDEN DE INVESTIGACI&Oacute;N A LA POLICÍA MINISTERIAL</strong></p><p class="p2">&nbsp;</p><p class="p3" style="text-align: right;"><strong>No. de Caso:<span class="Apple-converted-space">&nbsp; {NO_EXPEDIENTE}</span></strong></p><p class="p2">&nbsp;</p><p class="p4">Lugar: {MUNICIPIO_DOCUMENTO}, {ESTADO_DOCUMENTO}<br>Fecha:<span class="Apple-converted-space">&nbsp; {FECHA_DOCUMENTO}</span>,<span class="Apple-converted-space">&nbsp; </span>Hora: {HORA_DOCUMENTO}<br>Unidad de Investigaci&oacute;n: {OFICINA_DESCR}<br>Agente del Ministerio PÚblico: {EMPLEADO_NOMBRE}<br>Agente de la Polic&iacute;a Ministerial Asignado:<span class="Apple-converted-space">&nbsp; {POLICIA_NOMBRE}</span></p><p class="p6">&nbsp;</p><p class="p5" style="text-align: justify;">S&iacute;rvase llevar a cabo exhaustiva investigaci&oacute;n de los hechos denunciados dentro del n&uacute;mero de caso antes citado, debiendo informar a esta fiscal&iacute;a del resultado de la misma, en un per&iacute;odo de <span class="s1"><strong>30 d&iacute;as</strong></span>, esto con la finalidad de esclarecer los hechos denunciados por el <strong>{OFENDIDO_NOMBRE}</strong> por la probable comisi&oacute;n del delito de {DELITO_DESCR}. Lo anterior con fundamento en lo dispuesto por los art&iacute;culos 127, 131, 132 y dem&aacute;s relativos del C&oacute;digo Nacional de Procedimientos Penales y dem&aacute;s ordenamientos legales aplicables.</p><p class="p7">&nbsp;</p><p class="p8">&nbsp;</p><p class="p1" style="text-align: center;">EL AGENTE DEL MINISTERIO P&Uacute;BLICO:</p><p class="p7" style="text-align: center;">&nbsp;</p><p class="p1" style="text-align: center;">________________________________________</p><p class="p1" style="text-align: center;">LIC. {EMPLEADO_NOMBRE}</p><p class="p1" style="text-align: center;">AGENTE DEL MINISTERIO PÚBLICO TITULAR DE LA</p><p class="p1" style="text-align: center;">{OFICINA_DESCR}</p>`,
    variables: [
      { id: 1, descr: '{NO_EXPEDIENTE}', contenido: '0201-2023-00003', borrable: 'N' },
      { id: 2, descr: '{MUNICIPIO_DOCUMENTO}', contenido: 'ENSENADA', borrable: 'N' },
      { id: 3, descr: '{ESTADO_DOCUMENTO}', contenido: 'BAJA CALIFORNIA', borrable: 'N' },
      { id: 4, descr: '{OFICINA_DESCR}', contenido: 'UNIDAD DE DELITOS SEXUALES', borrable: 'N' },
      { id: 5, descr: '{EMPLEADO_NOMBRE}', contenido: 'MAYRA PATRICIA LOPEZ NAVARRO', borrable: 'N' },
      { id: 6, descr: '{POLICIA_NOMBRE}', contenido: 'EVELYN CAMPOS MEZA', borrable: 'N' },
      { id: 7, descr: '{OFENDIDO_NOMBRE}', contenido: 'C. MICHAEL ORTIZ MOLINA', borrable: 'N' },
      { id: 8, descr: '{DELITO_DESCR}', contenido: 'VIOLENCIA FAMILIAR EQUIPARADA', borrable: 'N' },
      { id: 9, descr: '{FECHA_DOCUMENTO}', contenido: '03 DE ENERO DEL 2023', borrable: 'S' },
      { id: 10, descr: '{HORA_DOCUMENTO}', contenido: '11:43 HRS.', borrable: 'S' },
    ],
    variablesUpdate: [
      { id: 1, descr: '{NO_EXPEDIENTE}', contenido: '0201-2023-00003', borrable: 'N' },
      { id: 2, descr: '{MUNICIPIO_DOCUMENTO}', contenido: 'MEXICALI', borrable: 'N' },
      { id: 3, descr: '{ESTADO_DOCUMENTO}', contenido: 'BAJA CALIFORNIA', borrable: 'N' },
      { id: 4, descr: '{OFICINA_DESCR}', contenido: 'UNIDAD DE DELITOS SEXUALES', borrable: 'N' },
      { id: 5, descr: '{EMPLEADO_NOMBRE}', contenido: 'ABDIEL OTONIEL FLORES GONZÁLEZ', borrable: 'N' },
      { id: 6, descr: '{POLICIA_NOMBRE}', contenido: 'POLICIA NUEVO', borrable: 'N' },
      { id: 7, descr: '{OFENDIDO_NOMBRE}', contenido: 'C. MICHAEL ORTIZ MOLINA', borrable: 'N' },
      { id: 8, descr: '{DELITO_DESCR}', contenido: 'VIOLENCIA FAMILIAR EQUIPARADA', borrable: 'N' },
      { id: 9, descr: '{FECHA_DOCUMENTO}', contenido: '03 DE ENERO DEL 2023', borrable: 'S' },
      { id: 10, descr: '{HORA_DOCUMENTO}', contenido: '11:43 HRS.', borrable: 'S' },
    ],
  };
  prevContent: string = '';
  currentContent: string = '';
  noEditTags: number = 0;

  tinymceInitOptions = {
    selector: 'textarea',
    menu: {
      file: { title: 'Archivo', items: 'newdocument | print' },
      edit: { title: 'Editar', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace readonly', },
      view: { title: 'Ver', items: 'code wordcount preview ' },
      insert: { title: 'Insertar', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime', },
      format: { title: 'Formato', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat', },
      table: { title: 'Tablas', items: 'inserttable | cell row column | advtablesort | tableprops deletetable', },
    },
    menubar: 'file edit insert view format table',
    plugins: 'lists link image table code wordcount searchreplace codesample preview template',
    toolbar: 'undo redo | alignleft aligncenter alignright alignjustify | bold italic | bullist numlist outdent indent | searchreplace code template',
    content_style: this.documentStyles,
    browser_spellcheck: true,
    height: 768,
    content_css: 'document',
    noneditable_class: 'nonedit',
    editable_class: 'editable',
    promotion: false,
    base_url: '/tinymce',
    suffix: '.min',
  };

  ngOnInit() {
    this.prevContent = this.loadVariablesTemplate(this.plantilla.variables, this.plantilla.plantilladescr);
    this.currentContent = this.prevContent;
    this.noEditTags = this.countNoEditableTags(this.prevContent);
  }

  onlyRead() {
    this.disabled = !this.disabled;
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

  updateVariables() {
    this.currentContent = this.updateVariablesTemplate(this.plantilla.variablesUpdate, this.currentContent);
  }

  updateVariablesTemplate(variables: any, html: string) {
    let returnHTML = '';
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;
    variables.forEach((element: any) => {
      Array.from(tempContainer.getElementsByClassName(element.descr)).forEach((variable: Element) => {
        variable.innerHTML = element.contenido;
      });
    });

    Array.from(tempContainer.children).forEach((child: Element) => {
      returnHTML += child.outerHTML;
    });

    return returnHTML;
  }

}
