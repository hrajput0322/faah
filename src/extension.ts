import * as vscode from 'vscode';
import { createPlayer } from './audio/player';
import { registerTerminalListener } from './listeners/terminalListener';
import { registerLintListener } from './listeners/lintListener';

export function activate(context: vscode.ExtensionContext) {
    const player = createPlayer(context);

    registerTerminalListener(context, player);
    registerLintListener(context, player);
}

export function deactivate() {}