import { group, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import Konva from 'konva';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
})
export class ChartViewComponent implements OnInit {
  a: Konva.Rect;
  b: Konva.Rect;
  isPaint = true;
  dots = [];
  ngOnInit() {
    const konva = new Konva.Stage({
      container: 'konva',
      width: 2000,
      height: 2000,
    });
    const layer = new Konva.Layer();
    konva.add(layer);

    const toolTip = new Konva.Group({
      x: 20,
      y: 20,
    });

    toolTip.add(
      new Konva.Line({
        points: [20, 20, 200, 20, 200, 90, 140, 90, 100, 150, 90, 90, 90, 50],
        stroke: '#df4b26',
        strokeWidth: 5,
      })
    );

    layer.add(toolTip);
  }
}
