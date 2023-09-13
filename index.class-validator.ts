import {
    IsNotEmpty,
    MinLength,
    validateOrReject,
} from "class-validator";

class Event {
    @IsNotEmpty()
    readonly type: "dummy" | "addToCart";

    constructor(type: Event["type"]) {
        this.type = type;
    }
}

class DummyEvent extends Event {
    constructor(dummy: string) {
        super("dummy");
        this.dummy = dummy;
    }

    @IsNotEmpty()
    dummy: string;
}

class AddToCartEvent extends Event {
    constructor(product: string) {
        super("addToCart");
        this.product = product;
    }

    @IsNotEmpty()
    @MinLength(8)
    product: string;
}

async function validateEvent(event: Event) {
    if (event.type === "dummy") {
        const dummyEvent = new DummyEvent((event as any).dummy); // Create a specific event instance
        await validateOrReject(dummyEvent);
    } else if (event.type === "addToCart") {
        const addToCartEvent = new AddToCartEvent((event as any).product); // Create a specific event instance
        await validateOrReject(addToCartEvent);
    } else {
        throw new Error("Invalid event type");
    }
}

const invalidDummy = new DummyEvent("");
const invalidEvent: Event = JSON.parse(JSON.stringify(invalidDummy));
validateEvent(invalidEvent)
    .then(() => console.log("invalidEvent is valid"))
    .catch((errors) => console.log("invalidEvent", errors));

