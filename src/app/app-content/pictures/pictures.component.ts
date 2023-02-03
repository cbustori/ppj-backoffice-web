import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'app-pictures',
    templateUrl: './pictures.component.html',
    styleUrls: ['./pictures.component.css'],
})
export class PicturesComponent implements OnInit {
    @Input() pictures: any[];
    @Input() fileLimit = 0;
    @Input() uploadedFiles: any[];
    @Output() fileAdded: EventEmitter<{
        limit: boolean;
        index: number;
    }> = new EventEmitter();
    @Output() fileDeleted: EventEmitter<number> = new EventEmitter();
    msgs: Message[];

    ngOnInit() {}

    onSelectFile(event) {
        this.msgs = [];
        const len = this.pictures ? this.pictures.length : 0;
        const size = this.uploadedFiles.length + len;
        if (size > this.fileLimit) {
            this.fileAdded.emit({
                limit: true,
                index: this.fileLimit - len,
            });
            this.msgs.push({
                severity: 'error',
                summary: 'Attention',
                detail: 'Vous ne pouvez pas ajouter plus de ' + this.fileLimit + ' images.',
            });
            setTimeout(() => {
                this.msgs = [];
            }, 5000);
        }
    }

    onDeletePicture(picture) {
        const index = this.pictures.findIndex(
            (p) => p.url === picture.url
        );
        this.fileDeleted.emit(index);
    }
}
