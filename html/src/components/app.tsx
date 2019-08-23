import { Component, h } from 'preact';
import 'bootstrap/dist/css/bootstrap.css';
import './../fontawesome/css/fontawesome.css';
import { ITerminalOptions, ITheme } from 'xterm';
import { Xterm } from './terminal';
import './../style/index.scss';

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug');
}

const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
const wsPath = window.location.pathname.endsWith('/') ? 'ws' : '/ws';
const url = [protocol, window.location.host, window.location.pathname, wsPath, window.location.search].join('');
const termOptions = {
    fontSize: 13,
    fontFamily: 'Menlo For Powerline,Consolas,Liberation Mono,Menlo,Courier,monospace',
    theme: {
        foreground: '#d2d2d2',
        background: '#2b2b2b',
        cursor: '#adadad',
        black: '#000000',
        red: '#d81e00',
        green: '#5ea702',
        yellow: '#cfae00',
        blue: '#427ab3',
        magenta: '#89658e',
        cyan: '#00a7aa',
        white: '#dbded8',
        brightBlack: '#686a66',
        brightRed: '#f54235',
        brightGreen: '#99e343',
        brightYellow: '#fdeb61',
        brightBlue: '#84b0d8',
        brightMagenta: '#bc94b7',
        brightCyan: '#37e6e8',
        brightWhite: '#f1f1f0',
    } as ITheme,
} as ITerminalOptions;

export class App extends Component {

    constructor(props) {
        super(props);
        this.myXterm = {};
    }

    onPause = () => {
        this.myXterm.sendData(new Uint8Array([32]));
    }

    onForward = () => {
        this.myXterm.sendData(new Uint8Array([190]));
    }
    onBackward = () => {
        this.myXterm.sendData(new Uint8Array([188]));
    }

    render() {
        return (
            <div className="container">

                <Xterm ref={(c) => this.myXterm = c} id="terminal-container" url={url} options={termOptions}/>
                <div className="text-center align-items-center" id="buttonsCenter">
                    <button type="submit" onClick={this.onBackward}><span
                        className="input-group-text"> <i>Slow</i> </span></button>
                    <button type="submit" onClick={this.onPause}><span
                        className="input-group-text"> <i>Pause</i> </span></button>
                    <button type="submit" onClick={this.onForward}><span
                        className="input-group-text"> <i>Fast</i> </span></button>
                </div>
            </div>
        );
    }
}
