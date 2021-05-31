export class Common{
  static downloadFile(response: any, fileName): void{
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    if (fileName) {
      downloadLink.setAttribute('download', fileName);
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
