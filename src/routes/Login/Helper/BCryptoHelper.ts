import bcrypt from 'bcrypt'


export default class BCryptoHelper {
    protected static rounds = 11

    public static async generateHash(value: string): Promise<string> {
        if(!value || value.length <= 0) {
            throw new Error('E necessario passar um valor para gerar o HASH')
        }

        const salt = await bcrypt.genSalt(this.rounds);
        return await bcrypt.hash(value, salt)
    }

    public static async compareValueWithHash(value: string, hash: string): Promise<boolean> {
        if(!value || value.length <= 0) {
            throw new Error('E necessario passar um valor para validar a senha');
        }
        if(!hash || hash.length <= 0) {
            throw new Error('E necessario passar um hash para validar a senha');
        }
        return await bcrypt.compare(value ,hash)
    }
  
}