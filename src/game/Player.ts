export default class Player {
    private name: string;
    private balance: number;

    constructor(nameInput: string){
        this.name = nameInput;
        this.balance = 0;
    }

    public getName(){
        return this.name;
    }

    public setName(nameInput: string){
        this.name = nameInput;
    }

    public getBalance(){
        return this.balance;
    }

    public claimWinning(){

    }

    public pay(){

    }

    public receive(){

    }

    public drawTile(){

    }

    public discardTile(){
        
    }
}