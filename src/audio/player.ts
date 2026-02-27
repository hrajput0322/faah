import * as vscode from 'vscode';
import { Cooldown } from '../utils/cooldown';

const playSound = require('play-sound')({ player: 'afplay' });

export interface FaahPlayer {
    play(): void;
}

export function createPlayer(context: vscode.ExtensionContext): FaahPlayer {
    const cooldown = new Cooldown(3000); // 3s cooldown

    function play() {
        if (!cooldown.canExecute()) return;
        console.log("play activated");

        const config = vscode.workspace.getConfiguration('faah');
        const enabled =
            config.get<boolean>('enableOnTestFail') ||
            config.get<boolean>('enableOnLintError');

        if (!enabled) return;

        const soundPath = context.asAbsolutePath('media/faah.mp3');

        playSound.play(soundPath, (err: any) => {
            if (err) console.error('Audio playback error:', err);
        });
    }

    return { play };
}