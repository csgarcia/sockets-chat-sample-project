class Users {
    constructor() {
        this.peopleConnected = [];
    }

    addPerson(id, name, room) {
        let person = { id, name, room };
        this.peopleConnected.push(person);
        return this.peopleConnected;
    }

    getPerson(id) {
        //this could be undefined if condition does not match
        return this.peopleConnected.filter(p => p.id === id)[0];
    }

    getPeopleConnected() {
        return this.peopleConnected;
    }

    getPeopleConnectedByRoom(room) {
        let peopleByRoom = [];
        for (let i = 0; i < this.peopleConnected.length; i++) {
            let currentPerson = this.peopleConnected[i];
            if (currentPerson.room !== room) {
                continue;
            }
            peopleByRoom.push(currentPerson);
        }
        return peopleByRoom;
    }

    deletePerson(id) {
        let personDeleted = this.getPerson(id);
        let filtered = [];
        for (let i = 0; i < this.peopleConnected.length; i++) {
            let currentPerson = this.peopleConnected[i];
            if (currentPerson.id === id) {
                continue;
            }
            filtered.push(currentPerson);
        }
        this.peopleConnected = filtered;
        return personDeleted;
    }

}

module.exports = Users;