import * as vscode from 'vscode';
import { FaahPlayer } from '../audio/player';
import { debounce } from './debounce';

export function registerLintListener(
    context: vscode.ExtensionContext,
    player: FaahPlayer
) {
    const debouncedCheck = debounce(() => {
        const config = vscode.workspace.getConfiguration('faah');
        if (!config.get<boolean>('enableOnLintError')) {return;}

        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {return;}

        const diagnostics = vscode.languages.getDiagnostics(
            activeEditor.document.uri
        );

        const hasError = diagnostics.length > 0;

        if (hasError) {
            player.play();
        }
    }, 2000);

    const disposable = vscode.workspace.onDidChangeTextDocument(() => {
        debouncedCheck();
    });

    context.subscriptions.push(disposable);
}