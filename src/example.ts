import { Popper } from "./popper";

const reference1 = document.getElementById('reference1')!;
const popper1 = document.getElementById('popper1')!;
const popperInstance = new Popper(reference1, popper1, { placement: 'bottom-end' });

const reference2 = document.getElementById('reference2')!;
const popper2 = document.getElementById('popper2')!;
// new Popper(reference2, popper2, { placement: 'bottom' });

const reference3 = document.getElementById('reference3')!;
const popper3 = document.getElementById('popper3')!;
// new Popper(reference3, popper3, { placement: 'bottom' });

