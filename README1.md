**The TTC Calculator component has:

-HTML Template: Contains the form for input fields and the dynamically updated output fields.
-TypeScript Logic: Includes properties to bind data (price, quantity, tva, etc.) and a method (calculatePrices()) to handle calculations.

*Two-Way Data Binding ([(ngModel)]):

Links the input fields (price, quantity, tva) to properties in the component's TypeScript class.
Automatically updates the model when the user types and vice versa.

*Event Binding ((input)="calculatePrices()"):

Listens for input changes and triggers the calculatePrices() method to recalculate prices dynamically.

*Pipes (number Pipe):

Formats the output for Prix Unitaire TTC and Prix Total TTC to show two decimal places (1.2-2).


**The RainbowText attribute Directive:
it changes the text and border color of an input element to a random color from a predefined list every time a key is pressed.

*@HostBinding binds the textColor and borderColor styles to the input element.
*@HostListener('keyup') listens for key press events.
*The getRandomColor() method selects a random color from the array.
*When a key is released, the colors of the text and border are updated, creating a "rainbow" effect.