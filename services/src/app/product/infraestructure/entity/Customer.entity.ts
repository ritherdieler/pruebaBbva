import { IsNotEmpty, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    names: string

    @Column()
    @IsNotEmpty()
    @Min(1)
    age: number

    constructor(names: string, age: number) {
        this.names = names;
        this.age = age;
    }
    
}