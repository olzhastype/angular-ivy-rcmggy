import { Component, OnInit } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
})
export class ChartViewComponent implements OnInit {
  svg =
    '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#B4CCB9" d="M18,4c0-1.104,0.896-2,2-2h24c1.104,0,2,0.896,2,2v9h-2V5c0-0.553-0.447-1-1-1H21c-0.553,0-1,0.447-1,1v8 h-2V4z"></path> <path fill="#394240" d="M60,13H48V4c0-2.211-1.789-4-4-4H20c-2.211,0-4,1.789-4,4v9H4c-2.211,0-4,1.789-4,4v43c0,2.211,1.789,4,4,4 h56c2.211,0,4-1.789,4-4V17C64,14.789,62.211,13,60,13z M18,4c0-1.104,0.896-2,2-2h24c1.104,0,2,0.896,2,2v9h-2V5 c0-0.553-0.447-1-1-1H21c-0.553,0-1,0.447-1,1v8h-2V4z M42,6v7H22V6H42z M62,60c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V42h10 v5c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1v-5h24v5c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1v-5h10V60z M14,46v-4v-2v-4h4v4v2 v4H14z M46,46v-4v-2v-4h4v4v2v4H46z M62,40H52v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5H20v-5c0-0.553-0.447-1-1-1h-6 c-0.553,0-1,0.447-1,1v5H2V17c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V40z"></path> <g> <rect x="46" y="36" fill="#F9EBB2" width="4" height="10"></rect> <rect x="14" y="36" fill="#F9EBB2" width="4" height="10"></rect> </g> <g> <path fill="#45AAB8" d="M60,62c1.104,0,2-0.896,2-2V42H52v5c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5H20v5 c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5H2v18c0,1.104,0.896,2,2,2H60z"></path> <path fill="#45AAB8" d="M60,15H4c-1.104,0-2,0.896-2,2v23h10v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1v5h24v-5 c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1v5h10V17C62,15.896,61.104,15,60,15z"></path> </g> <path opacity="0.2" d="M60,62c1.104,0,2-0.896,2-2V42H52v5c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5H20v5 c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5H2v18c0,1.104,0.896,2,2,2H60z"></path> </g> </g></svg>';

  ngOnInit() {
    const stage = new Konva.Stage({
      container: 'konva',
      width: 2000,
      height: 2000,
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    const url = svgToURL(this.svg);
    const toolTip = new Konva.Group({
      x: 20,
      y: 20,
    });
    var textNode = new Konva.Text({
      text: 'Some text here',
      fontSize: 20,
    });
    textNode.on('dblclick dbltap', () => {
      textNode.hide();

      // create textarea over canvas with absolute position
      // first we need to find position for textarea
      // how to find it?

      // at first lets find position of text node relative to the stage:
      var textPosition = textNode.absolutePosition();

      // so position of textarea will be the sum of positions above:
      var areaPosition = {
        x: stage.container().offsetLeft + textPosition.x,
        y: stage.container().offsetTop + textPosition.y,
      };

      // create textarea and style it
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      // apply many styles to match text on canvas as close as possible
      // remember that text rendering on canvas and on the textarea can be different
      // and sometimes it is hard to make it 100% the same. But we will try...
      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
      textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
      textarea.style.height =
        textNode.height() - textNode.padding() * 2 + 5 + 'px';
      textarea.style.fontSize = textNode.fontSize() + 'px';
      textarea.style.border = 'none';
      textarea.style.padding = '0px';
      textarea.style.margin = '0px';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      textarea.style.lineHeight = textNode.lineHeight().toString();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = 'left top';
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      let rotation = textNode.rotation();
      var transform = '';
      if (rotation) {
        transform += 'rotateZ(' + rotation + 'deg)';
      }

      var px = 0;
      // also we need to slightly move textarea on firefox
      // because it jumps a bit
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefox) {
        px += 2 + Math.round(textNode.fontSize() / 20);
      }
      transform += 'translateY(-' + px + 'px)';

      textarea.style.transform = transform;

      // reset height
      textarea.style.height = 'auto';
      // after browsers resized it we can set actual value
      textarea.style.height = textarea.scrollHeight + 3 + 'px';

      textarea.focus();

      function removeTextarea() {
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        textNode.show();
      }

      function setTextareaWidth(newWidth) {
        if (!newWidth) {
          // set width for placeholder
          newWidth = textNode.width() * textNode.fontSize();
        }
        // some extra fixes on different browsers
        var isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || isFirefox) {
          newWidth = Math.ceil(newWidth);
        }

        var isEdge = false;
        if (isEdge) {
          newWidth += 1;
        }
        textarea.style.width = newWidth + 'px';
      }

      textarea.addEventListener('keydown', function (e) {
        // hide on enter
        // but don't hide on shift + enter
        if (e.keyCode === 13 && !e.shiftKey) {
          textNode.text(textarea.value);
          removeTextarea();
        }
        // on esc do not set value back to node
        if (e.keyCode === 27) {
          removeTextarea();
        }
      });

      textarea.addEventListener('keydown', function (e) {
        let scale = textNode.getAbsoluteScale().x;
        setTextareaWidth(textNode.width() * scale);
        textarea.style.height = 'auto';
        textarea.style.height =
          textarea.scrollHeight + textNode.fontSize() + 'px';
      });

      function handleOutsideClick(e) {
        if (e.target !== textarea) {
          textNode.text(textarea.value);
          removeTextarea();
        }
      }
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      });
    });
    var tra = new Konva.Transformer();

    Konva.Image.fromURL(url, (img: Konva.Image) => {
      console.log(img);
      toolTip.draggable(true);
      toolTip.add(img);
      layer.add(tra);
      toolTip.add(textNode);
      tra.nodes([toolTip]);
    });
    layer.add(toolTip);
  }
}
function svgToURL(s) {
  const uri = window.btoa(unescape(encodeURIComponent(s)));
  return 'data:image/svg+xml;base64,' + uri;
}
