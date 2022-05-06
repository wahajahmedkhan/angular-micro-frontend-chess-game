import {Directive, ElementRef, HostBinding, Input, Renderer2, SimpleChanges, ViewContainerRef} from '@angular/core';
import {MatSpinner} from '@angular/material/progress-spinner';
import {uuidv4} from 'src/app/core/helpers/uuid4-maker';

@Directive({
  selector: '[appSpinnerLoader]',
})
export class SpinnerLoaderDirective {
  @HostBinding('style.position')
  hostPosition = 'relative';

  @Input() appSpinnerLoader = false;

  uid: string;

  constructor(public el: ElementRef, public renderer: Renderer2, public vcRef: ViewContainerRef) {}

  ngOnInit() {
    this.uid = 'loading-container-' + uuidv4();
    const componentRef = this.vcRef.createComponent(MatSpinner);
    const spinner: MatSpinner = componentRef.instance;
    spinner.strokeWidth = 3;
    spinner.diameter = 30;
    const loadingContainer = this.renderer.createElement('div');
    this.disableField();
    this.renderer.setStyle(loadingContainer, 'display', this.appSpinnerLoader ? 'flex' : 'none');
    this.renderer.setAttribute(loadingContainer, 'disabled', 'true');
    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.addClass(loadingContainer, this.uid);
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    this.renderer.setStyle(loadingContainer, 'left', '0');
    this.renderer.setStyle(loadingContainer, 'background', '#FFFFFF');
    this.renderer.setStyle(loadingContainer, 'width', '100%');
    this.renderer.setStyle(loadingContainer, 'height', '100%');
    this.renderer.appendChild(loadingContainer, spinner._elementRef.nativeElement);
    this.renderer.appendChild(this.el.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['appSpinnerLoader']) {
      const container = this.el.nativeElement;
      const div = container.querySelector('.' + this.uid);
      this.disableField();
      if (div) {
        this.renderer.setStyle(div, 'display', this.appSpinnerLoader ? 'flex' : 'none');
      }
    }
  }

  disableField() {
    if (this.appSpinnerLoader) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', String(this.appSpinnerLoader));
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
  }
}
