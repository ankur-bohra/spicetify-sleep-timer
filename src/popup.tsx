import React, { ReactElement } from 'react';
import "./popup.css";

enum Page {
    Default,
    Custom,
    Controls
}

interface Help {
    link: string,
    text: string
}

interface Subtext {
    text: string,
    callback: () => void
}
interface MainButton {
    id: string,
    text: string,
    subtext?: Subtext,
    callback: () => void
}

interface PopupProps {
    visible: boolean,
    title?: string,
    help?: Help,
    options?: Array<ReactElement>,
    buttons: Array<ReactElement>
}
interface PopupState {
    page: Page,
}
class Popup extends React.Component<PopupProps, PopupState> {
    constructor(props: PopupProps) {
        super(props);
    }
    render() {
        let title: ReactElement | null = null;
        if (this.props.title) {
            title = (
                <div className="st-popup-title">
                    <h3 className="st-popup-title__text">{this.props.title}</h3>
                    {this.props.help
                        ? <a className="st-popup-title__help" href={this.props.help.link} target="_blank">
                            <svg role="img" height="16" width="16" className="Svg-ytk21e-0 jAKAlG icon" viewBox="0 0 16 16">
                                <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
                                <path d="M7.25 12.026v-1.5h1.5v1.5h-1.5zm.884-7.096A1.125 1.125 0 007.06 6.39l-1.431.448a2.625 2.625 0 115.13-.784c0 .54-.156 1.015-.503 1.488-.3.408-.7.652-.973.818l-.112.068c-.185.116-.26.203-.302.283-.046.087-.097.245-.097.57h-1.5c0-.47.072-.898.274-1.277.206-.385.507-.645.827-.846l.147-.092c.285-.177.413-.257.526-.41.169-.23.213-.397.213-.602 0-.622-.503-1.125-1.125-1.125z"></path>
                            </svg>
                            <span className="hidden-visually">{this.props.help.text}</span>
                          </a>
                        : null
                    }
                </div>
            )
        }
        return (
            <div className={this.props.visible ? "st-popup st-popup--is-visible" : "st-popup"}>
                {title}
                <div className="st-popup-body">
                    {this.props.options ? <div>{this.props.options}</div> : null}
                    {this.props.buttons}
                </div>
            </div>
        )
    }
}

interface MainButtonProps {
    text: string,
    id: string,
    callback: () => void,
}
class MainButton extends React.Component<MainButtonProps, {}> {
    constructor(props: MainButtonProps) {
        super(props);
    }
    render() {
        return (
            <a onClick={this.props.callback} id={this.props.id}>
                <span className="encore-bright-accent-set">{this.props.text}</span>
            </a>
        )
    }
}

interface MinorButtonProps {
    text: string,
    callback: () => void,
}
class MinorButton extends React.Component<MinorButtonProps, {}> {
    constructor(props: MinorButtonProps) {
        super(props);
    }
    render() {
        return <button className="st-popup-sub-btn" onClick={this.props.callback}>{this.props.text}</button>
    }
}


interface DefaultsPopupProps {
    visible: boolean,
}
interface DefaultsPopupState {}
class DefaultsPopup extends React.Component<DefaultsPopupProps, DefaultsPopupState> {
    constructor(props: DefaultsPopupProps) {
        super(props);
    }

    render() {
        const options: Array<ReactElement> = [
            <button>After 1 minute</button>,
            <button>After 5 minute</button>,
            <button>After 15 minute</button>,
            <button>After 30 minute</button>,
            <button>At end of track</button>,
        ]
        const buttons: Array<ReactElement> = [
            <MainButton text="Start timer" id="st-start-timer" callback={() => {Spicetify.showNotification("Starting timer!")}}/>,
            <MinorButton text="Use a custom timer" callback={() => Spicetify.showNotification("Requested a custom timer!")}/>
        ]
        return <Popup visible={this.props.visible} title="Stop playing..." options={options} buttons={buttons}/>
    }
}

interface CustomsPopupProps {
    visible: boolean,
}
interface CustomsPopupState {}
class CustomsPopup extends React.Component<CustomsPopupProps, CustomsPopupState> {
    constructor(props: CustomsPopupProps) {
        super(props);
    }
    render() {
        const durationTimer = (
            <div>
                 After 
                 <input type="number" min="0" max="23" id="hours" value="23"/> <label htmlFor="hours">hrs</label>
                 <input type="number" min="0" max="59" id="minutes" value="59"/> <label htmlFor="minutes">mins</label> 
                 <input type="number" min="0" max="59" id="seconds" value="59"/> <label htmlFor="seconds">secs</label>
            </div>
        )
        const tracksTimer = (
            <div>
                After <input type="number" min="1" id="tracks" value="99"/> <label htmlFor="tracks">tracks</label> have played
            </div>
        )
        const clockTimer = (
            <div>
                At <input type="time" id="time" value="7:30"/> <label htmlFor="time">clock time</label>
            </div>
        )
        const options: Array<ReactElement> = [durationTimer, tracksTimer, clockTimer]
        const buttons: Array<ReactElement> = [
            <MainButton text="Start timer" id="st-start-timer" callback={() => {Spicetify.showNotification("Starting timer!")}}/>,
            <MinorButton text="Use a default timer" callback={() => Spicetify.showNotification("Requested a default timer!")}/>
        ]
        return <Popup visible={this.props.visible} title="Stop playing..." options={options} buttons={buttons}/>
    }
}

interface ControlsPopupProps {
    visible: boolean,
}
interface ControlsPopupState {}
class ControlsPopup extends React.Component<ControlsPopupProps, ControlsPopupState> {
    constructor(props: ControlsPopupProps) {
        super(props);
    }
    render() {
        const buttons: Array<ReactElement> = [
            <MainButton text="Pause timer" id="st-pause-timer" callback={() => {Spicetify.showNotification("Paused timer!")}}/>,
            <MainButton text="Stop timer" id="st-stop-timer" callback={() => {Spicetify.showNotification("Stopped timer")}}/>
        ]
        return <Popup visible={this.props.visible} buttons={buttons}/>
    }
}

export default CustomsPopup;