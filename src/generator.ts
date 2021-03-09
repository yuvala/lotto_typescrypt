//import { Moshe } from "./test";
const configArray = [{
    title: 'Eurojackpot: (5 from 50)',
    entitiesNumber: 50,
    selection: 5,
    maxInArow: 6
},
{
    title: 'Eurojackpot:(2 of 10)',
    entitiesNumber: 10,
    selection: 2,
    maxInArow: 10
},
{
    title: 'Loto:(6 of 45)',
    entitiesNumber: 45,
    selection: 6,
    maxInArow: 5
}];
class EntitiesTable {
    entitiesNumber: number;
    totalSelection: number;
    maxInArow: number;
    entryPoint: HTMLElement;
    result = [];
    genBtn: HTMLButtonElement;
    title: string;

    constructor(config: { title?: string, entitiesNumber: number, selection: number, maxInArow: number }) {
        this.title = config.title !== '' ? config.title : 'someting';
        this.entitiesNumber = config.entitiesNumber;
        this.totalSelection = config.selection;
        this.maxInArow = config.maxInArow; // Math.floor(this.entitiesNumber / config.rowNum);
        this.createEntryPoint();
        this.generateButton();
        this.generateTitle();
        this.createTable();

    }
    createEntryPoint() {
        this.entryPoint = document.createElement('div');
        this.entryPoint.classList.add('container');
        //   this.entryPoint.setAttribute('id', 'wala');
        document.getElementById('entry-point').appendChild(this.entryPoint);
    }

    generateButton() {
        this.genBtn = document.createElement('button');
        this.genBtn.setAttribute('id', 'genBtn');
        this.genBtn.innerText = 'generate';
        this.genBtn.addEventListener('click', (e) => {
            this.startMarking();
        });
        this.entryPoint.appendChild(this.genBtn);
    }
    generateTitle() {
        let title = document.createElement('span')
        title.classList.add('title');
        title.innerText = this.title;
        this.entryPoint.appendChild(title);
    }

    createElement(className?: string) {
        let el = document.createElement('div');
        if (className) {
            el.setAttribute('class', className);
        }
        return el;
    }

    createTable() {
        let counter = 1;
        let rows = Math.ceil(this.entitiesNumber / this.maxInArow);
        let table = this.createElement('table');
        for (let r = 0; r < rows; r++) {
            let row = this.createElement('tr');
            for (let i = 0; i < this.maxInArow; i++) {

                let td = this.createElement('td');
                let entity = this.createElement('cell');
                let span = this.createElement('span');
                let val = '' + (counter);
                span.innerText = val;
                entity.setAttribute('id', `_${val}`);
                entity.appendChild(span);
                td.appendChild(entity)
                row.appendChild(td);
                counter++;
                console.log(counter,this.entitiesNumber);

                 if (counter > this.entitiesNumber) {
                     break;
                 }
            }
            table.appendChild(row);
        }
        this.entryPoint.appendChild(table);
    }

    generateNumber() {
        this.result.length = 0;
        let counter = 1;
        while (counter < this.totalSelection + 1) {
            let num = this.randomNumber(1, this.entitiesNumber);
            if (this.result.indexOf(num) === -1) {
                this.result.push(num);
                counter++;
            }

        }
    }
    randomNumber(min, max) {
        return Math.floor((Math.random() * max) + 1);
    }

    resetOldMarks(): void {
        let old = Array.from(this.entryPoint.querySelectorAll('.marked'));
        if (old.length) {
            old.forEach((entitiy) => {
                entitiy.classList.remove('marked');
            });
        }
    }

    startMarking(): void {
        this.resetOldMarks();
        this.generateNumber();
        this.result.forEach(v => {
            let el = this.entryPoint.querySelector(`#_${v}`);
            el.classList.add('marked');
        });
    }


}





configArray.forEach(config => {
    new EntitiesTable(config);
});
