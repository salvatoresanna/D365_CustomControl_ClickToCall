/// <reference path="./ClickToCall.d.ts" />
import ClickToCallF from './ClickToCall';
import {IInputs, IOutputs} from "./generated/ManifestTypes";


export class ClickToCall implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _imageElement: HTMLImageElement;
	private _inputElement: HTMLInputElement;
	private _divElement: HTMLDivElement;
	private _divModal1Element: HTMLDivElement;
	private _divModal2Element: HTMLDivElement;
	private _spanElement : HTMLSpanElement;
	private _pElement: HTMLParagraphElement;
    private _clickToCall: EventListenerOrEventListenerObject;
    private _changeFieldValue: EventListenerOrEventListenerObject;
    private _context: ComponentFramework.Context<IInputs>;
    private _container: HTMLDivElement;

	constructor()
	{

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		debugger;
		this._context = context;
        this._container = container;

		var crmPhoneNumberAttribute = (context.parameters.PhoneNumber.attributes)? context.parameters.PhoneNumber.attributes.LogicalName: "";

		this._clickToCall = this.clickToCall.bind(this, crmPhoneNumberAttribute);

		this._divElement = document.createElement("div");
		this._divElement.className = "vertical-center";


		this._inputElement = document.createElement("input");
		this._inputElement.className = "input";
		this._divElement.appendChild(this._inputElement);
		this._changeFieldValue = this.changeFieldValue.bind(this._inputElement, crmPhoneNumberAttribute);
        this._inputElement.addEventListener('input', this._changeFieldValue);

		//@ts-ignore
		var crmPhoneNumberAttributeValue = Xrm.Page.getAttribute(crmPhoneNumberAttribute).getValue();
		this._inputElement.value = crmPhoneNumberAttributeValue;

        this._imageElement = document.createElement("img");
        this._imageElement.setAttribute("alt", "Click To Call");
        this._imageElement.addEventListener("click", this._clickToCall);
		this._context.resources.getResource(ImageName, this.setImage.bind(this, false, "png"), this.showError.bind(this));
		this._divElement.appendChild(this._imageElement);


		this._divModal1Element = document.createElement("div");
		this._divModal1Element.className = "modal";
		this._divModal1Element.id = "myModal";

		this._divModal2Element = document.createElement("div");
		this._divModal2Element.className = "modal-content";
		this._spanElement = document.createElement("span");
		this._spanElement.className = "close";
		this._pElement = document.createElement("p");
		this._pElement.id ="my_p";

		this._divModal2Element.appendChild(this._spanElement);
		this._divModal2Element.appendChild(this._pElement);

		this._divModal1Element.appendChild(this._divModal2Element);

        this._container.appendChild(this._divElement);
        this._container.appendChild(this._divModal1Element);
	}


	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
	}

	public getOutputs(): IOutputs
	{
		return {};
	}

	public destroy(): void
	{
	}

	private clickToCall(controlName: string): void {
        debugger;
		var caller = new ClickToCallF();
		//@ts-ignore
        caller.run(Xrm.Page.getAttribute(controlName).getValue());
	}

	private changeFieldValue(this: HTMLInputElement, controlName: string): void {
        debugger; 
		//@ts-ignore
		Xrm.Page.getAttribute(controlName).setValue(this.value);
	}


	private showError(): void
  	{
  	}

	private setImage(shouldUpdateOutput:boolean, fileType: string, fileContent: string): void
	{
		debugger;
		let imageUrl:string = this.generateImageSrcUrl(fileType, fileContent);
		this._imageElement.src = imageUrl;
	}

	private generateImageSrcUrl(fileType: string, fileContent: string): string
	{
		debugger;
		if(!fileContent)
			return ImageData;
		
			return  "data:image/" + fileType + ";base64, " + fileContent;
	}

}

const ImageName = "img/ctc.png"
const ImageData = "data:image/png;base64,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";
