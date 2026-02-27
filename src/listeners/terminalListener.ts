import * as vscode from 'vscode';
import { FaahPlayer } from '../audio/player';

export function registerTerminalListener(
    context: vscode.ExtensionContext,
    player: FaahPlayer
) {
    const disposable = vscode.tasks.onDidEndTaskProcess(event => {
        const config = vscode.workspace.getConfiguration('faah');
        if (!config.get<boolean>('enableOnTestFail')) return;

        if (event.exitCode && event.exitCode !== 0) {
            player.play();
        }
    });

    context.subscriptions.push(disposable);
}