export class Config{
    private ip: string;
    constructor(){
        // this.ip = '192.168.0.9'
        // this.ip = '192.168.43.70'
        // this.ip = '10.168.97.255';
        this.ip = 'localhost';
        // this.ip = '10.168.116.196';
    }
    
    public getIp() : string {
        return this.ip
    }
    
}