import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit
} from "@angular/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { htmlData } from "../assets/html/html.data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "pdfConvertDeneme";
  @ViewChild("denemeText", { static: true }) denemeText: ElementRef;
  htmlData: string = htmlData;

  ngOnInit() {
    // html2canvas(this.denemeText.nativeElement).then(canvas => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   const fileName = "marble-diagram.png";
    //   link.download = fileName;
    //   link.click();
    // });
  }

  ngAfterViewInit() {
    // html2canvas(this.denemeText.nativeElement, {scrollY: -window.scrollY}).then(canvas => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   const fileName = "marble-diagram.png";
    //   link.download = fileName;
    //   link.click();
    // });
    // const doc = new jsPDF();
    // const specialElementHandlers = {
    //   "#editor": function(element, renderer) {
    //     return true;
    //   }
    // };
    // const content = this.denemeText.nativeElement;
    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   width: 190,
    //   elementHandlers: specialElementHandlers
    // });
    // doc.save();
  }

  print() {
    // html2canvas(this.denemeText.nativeElement).then(canvas => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   const fileName = "marble-diagram.png";
    //   link.download = fileName;
    //   link.click();
    // });

    html2canvas(this.denemeText.nativeElement, {
      scrollY: -window.scrollY
    }).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jsPDF("p", "mm");
      let position = 0;

      doc.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }
      doc.save("file.pdf");
    });
  }
}
