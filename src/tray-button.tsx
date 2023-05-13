import React, { MouseEvent } from 'react';
import Popup from './popup';
import "./tray-button.css";

const ACTIVE_BUTTON_COLOUR = "#1DB954";
const HOVER_BUTTON_COLOUR = "#FFFFFF";
const INACTIVE_BUTTON_COLOUR = "#B3B3B3";

interface TrayButtonProps {}
interface TrayButtonState {
    isTimerActive: boolean,
    isUnderMouse: boolean,
    isPopupVisible: boolean,
}
class TrayButton extends React.Component<TrayButtonProps, TrayButtonState> {
    // This is the heart of the extension.
    // It houses the actual button and popup elements.
    constructor(props: TrayButtonProps) {
        super(props);
        this.state = {
            isTimerActive: false,
            isUnderMouse: false,
            isPopupVisible: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const buttonColour = this.state.isTimerActive ? ACTIVE_BUTTON_COLOUR
                                                      : this.state.isUnderMouse || this.state.isPopupVisible ? HOVER_BUTTON_COLOUR
                                                                                                             : INACTIVE_BUTTON_COLOUR;
        return (
            <button 
                id="st-tray-button"
                onMouseEnter={() => {this.setState({"isUnderMouse": true})}}
                onMouseLeave={() => {this.setState({"isUnderMouse": false})}}
                onClick={this.handleClick}
            >
                <svg id="moon-svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="16" height="16" viewBox="62.748370679045365 151.48057845294665 361.72942 361.72942" xmlSpace="preserve">
                    <defs>
                    </defs>
                    <g transform="matrix(1 0 0 1 243.61 332.35)" id="ibrzd8HdOqTGw7lZy1DfU">
                        <path fill={buttonColour} strokeWidth={0} strokeDashoffset={0} strokeLinejoin="miter" strokeMiterlimit={4}  fillRule="nonzero" opacity={1} vectorEffect="non-scaling-stroke" transform="translate(-176.86, -180.86)" d="M 187 361.72942 C 83.776 361.72942 0 277.95342 0 174.72942 C 0 95.00887 49.96879 26.888210000000015 120.27384 0 C 107.31071 25.44049 100 54.23639 100 84.72942 C 100 187.95342 183.776 271.72942 287 271.72942 C 310.50345 271.72942 332.99862 267.3861 353.72616 259.45884 C 322.80692999999997 320.13864 259.73097 361.72942 187 361.72942 z" strokeLinecap="round" />
                    </g>
                </svg>
                <Popup visible={this.state.isPopupVisible} />
            </button>
        )    
    }
    handleClick(event: MouseEvent) {
        console.log("Click target was: " + event.target.toString());
        this.setState({
            isPopupVisible: !this.state.isPopupVisible,
        })
    }
}

export default TrayButton;