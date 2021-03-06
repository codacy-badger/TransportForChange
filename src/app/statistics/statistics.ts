import { formatNumber } from '@angular/common';

export class Statistic {
    shortName: string;
    description: string;
    multiplier: number;
    source: Source;

    getString(delta: number) {
        const templateArgs = {
            // assumes 5 trips a week, every week for a year
            saving: formatNumber(delta * this.multiplier * 5 * 52, 'en-au', '1.0-2'),
        };
        return new Function('return `' + this.description + '`;').call(templateArgs);
    }

    constructor(shortName: string,
                description: string,
                multiplier: number,
                source: Source) {
        this.shortName = shortName;
        this.description = description;
        this.multiplier = multiplier;
        this.source = source;
    }
}

export class Source {
    name: string;
    url: string;
}

const tfaForms: Source = {
    name: 'TFA Forms',
    url: 'https://www.tfaforms.com/4666774'
};

const epa: Source = {
    name: 'EPA',
    url: 'https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator'
};

const kmsInCar = new Statistic(
    'KMs in a private car',
    'Choosing to take this trip daily via Public Transport for a year will' +
    ' save the equivalent CO2 of a private vehicle travelling ${this.saving}km',
    3.99339440104167,
    epa
);

const kmsInAnAircraft = new Statistic(
    'KMs in a private Aircraft',
    'Choosing to take this trip daily via Public Transport for a year will' +
    ' save the equivalent CO2 of a private aircraft travelling ${this.saving}km',
    6.44354580397181,
    tfaForms
);

const kmsOnATrain = new Statistic(
    'KMs on a Train',
    'Choosing to take this trip daily via Public Transport will' +
    ' save the equivalent CO2 of a train travelling ${this.saving}km',
    11.8265994503153,
    tfaForms
);

const homeElectricity = new Statistic(
    'Home Electricity Usage',
    'Choosing to take this trip daily via Public Transport for a year will' +
    ' save the equivalent CO2 generated by ${this.saving * 100}% of an average' +
    ' household\'s annual electricity usage',
    0.000169270833333333,
    epa
);

const smartPhoneRecharges = new Statistic(
    'Smart Phone Recharges',
    'Choosing to take this trip daily via Public Transport for a year will' +
    ' save the equivalent CO2 generated by charging ${this.saving} smart phones',
    127.532161458333,
    epa
);

const recycling = new Statistic(
    'Garbage bags recycled instead of landfill',
    'Choosing to take this trip daily via Public Transport for a year will' +
    ' save the equivalent CO2 generated by sending ${this.saving} garbage bags to landfill' +
    ' instead of recycling them.',
    127.532161458333,
    epa
);

const ledLightBulbs = new Statistic(
    'Energy emitted by LED light bulbs',
    'Choosing to take this trip daily via Public Transport for a year will' +
    ' save the equivalent CO2 saved by converting ${this.saving} incandescent light bulbs to LEDs',
    0.0380208333333333,
    epa
);

const treeSeedlings = new Statistic(
    'CO2 absorbed by tree seedlings growing for 10 years',
    'Choosing to take this trip daily via Public Transport for a year will' +
    ' save the equivalent CO2 absorbed by ${this.saving} tree seedlings growing for 10 years',
    0.0165364583333333,
    epa
);


export const Statistics: ReadonlyArray<Statistic> =
    [
        kmsInCar,
        kmsInAnAircraft,
        kmsOnATrain,
        homeElectricity,
        smartPhoneRecharges,
        recycling,
        ledLightBulbs,
        treeSeedlings
    ];
