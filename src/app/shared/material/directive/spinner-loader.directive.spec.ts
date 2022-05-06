import {SpinnerLoaderDirective} from './spinner-loader.directive';

describe('SpinnerLoaderDirective', () => {
  let spinnerDirective: SpinnerLoaderDirective;
  const ElementRefMock: any = {nativeElement: jest.fn()};
  const Renderer2Mock: any = {
    setStyle: jest.fn(),
    addClass: jest.fn(),
    appendChild: jest.fn(),
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
  };
  const vcRefMock: any = {createComponent: jest.fn()};

  beforeEach(() => {
    spinnerDirective = new SpinnerLoaderDirective(ElementRefMock, Renderer2Mock, vcRefMock);
  });

  it('should create an instance', () => {
    expect(spinnerDirective).toBeTruthy();
  });
});
