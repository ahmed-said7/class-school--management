import { Injectable } from "@nestjs/common";

interface Q {
    select?:string;
    sort?:string;
    keyword?:string;
    limit?:string;
    page?:string;
};

@Injectable()
export class ApiService< T extends Q > {
    obj={ where:{} , orderBy:{} , select:{} , skip:0 , take:10 };
    query:T;
    filter(q:T){
        this.query=q;
        const queryObj={ ... this.query };
        const fields=['select',"sort","keyword","limit","page"];
        fields.forEach( field => delete queryObj[field] );
        this.obj.where=queryObj;
        return this;
    };
    select(){
        if( this.query?.select ){
            this.query.select.split(",").filter( field => !field.startsWith("-") )
            .forEach( field => this.query.select[field] = true );
        };
        return this;
    };
    sort(){
        if( this.query?.sort ){
            const sort=this.query.select.split(",");
            this.obj.orderBy[sort[0]] = sort[0].startsWith("-") ? "asc" : "desc";
        };
        return this;
    };
    pagination(){
        const take=parseInt( this.query?.limit ) || 10;
        const page=parseInt( this.query?.page ) || 1;
        const skip= ( page - 1 ) * take ;
        this.obj.take=take;
        this.obj.skip=skip;
        return this;
    };
};