import type { Option } from "./types";

function getBoundingClientRect(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top,
  };
}

function setStyle(element: HTMLElement, styles: Record<string, number | string>) {
  Object.keys(styles).forEach(function (prop) {
    const propVal = typeof styles[prop] === 'number' ? styles[prop] + 'px' : styles[prop];
    element.style.setProperty(prop, propVal);
  });
}

export class Popper {
  reference?: HTMLElement;
  popper?: HTMLElement;
  options?: Option;
  constructor(reference: HTMLElement, popper: HTMLElement, options: Option) {
    if (!reference || !popper) {
      return
    }
    this.reference = reference;
    this.popper = popper;
    this.options = options;
    this.init()
  }

  init() {
    const { reference, popper, options } = this
    const placement = options!.placement || "right-start";
    const popperDisplay = popper!.style.display
    const popperRect = getBoundingClientRect(popper!)
    this.popper!.style.display = 'none'
    const referenceRect = getBoundingClientRect(reference!)
    let popperOffsets = {
      left: 0,
      top: 0,
    };
    const placementArray = placement.split("-");
    const baseOffsets = {
      top: {
        top: referenceRect.top - popperRect.height,
        left: referenceRect.left + referenceRect.width / 2 - popperRect.width / 2,
      },
      bottom: {
        top: referenceRect.bottom,
        left: referenceRect.left + referenceRect.width / 2 - popperRect.width / 2,
      },
      left: {
        top: referenceRect.top + referenceRect.height / 2 - popperRect.height / 2,
        left: referenceRect.left - popperRect.width,
      },
      right: {
        top: referenceRect.top + referenceRect.height / 2 - popperRect.height / 2,
        left: referenceRect.right,
      },
    };
    const basePlacement = placementArray[0] as keyof typeof baseOffsets;
    const shiftPlacement = placementArray[1] as 'end' | 'start';
    const shiftOffsets = {
      x: {
        start: {
          left: referenceRect.left,
        },
        end: {
          left: referenceRect.right - popperRect.width,
        },
      },
      y: {
        start: { top: referenceRect.top },
        end: { top: referenceRect.bottom - popperRect.height },
      },
    };
    const axis = ["bottom", "top"].indexOf(basePlacement) !== -1 ? "x" : "y";
  
    popperOffsets = Object.assign(
      popperOffsets,
      baseOffsets[basePlacement],
      shiftPlacement ? shiftOffsets[axis][shiftPlacement] : {}
    );

    setStyle(popper!, {
      position: 'absolute',
      ...popperOffsets
    });
    this.popper!.style.display = popperDisplay
  }
}