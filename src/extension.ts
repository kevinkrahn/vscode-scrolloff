'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(new ScrollOff());
}

export function deactivate() { }

class ScrollOff {
    private disposable: vscode.Disposable;

    constructor() {
        let subscriptions: vscode.Disposable[] = [];
        vscode.window.onDidChangeTextEditorSelection(this.onCursorMove, this, subscriptions);
        this.disposable = vscode.Disposable.from(...subscriptions);
    }

    onCursorMove(e: vscode.TextEditorSelectionChangeEvent) {
        if(e.textEditor.selections.length === 1 && e.kind !== vscode.TextEditorSelectionChangeKind.Mouse) {
            const config = vscode.workspace.getConfiguration("scrolloff");
            const alwaysCenter: boolean = config.get("alwaysCenter", false);
            const scrolloff: number = config.get("scrolloff", 15);
            if(e.selections.length === 1) {
                const selection = e.textEditor.selection;
                if (alwaysCenter) {
                    e.textEditor.revealRange(new vscode.Range(selection.start, selection.end),
                        vscode.TextEditorRevealType.InCenter);
                }
                else {
                    e.textEditor.revealRange(new vscode.Range(
                        selection.active.line - scrolloff, 0,
                        selection.active.line + scrolloff, 0),
                        vscode.TextEditorRevealType.Default);
                }
            }
        }
    }

    dispose() {
        this.disposable.dispose();
    }
}