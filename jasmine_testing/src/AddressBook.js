function AddressBook(){
    this.contacts = [];
    this.initialComplete = false;
    this.a = 0;
}

AddressBook.prototype.addContact = function(contact){
    this.contacts.push(contact);
}
AddressBook.prototype.getContact = function(index){
    return this.contacts[index];
}

AddressBook.prototype.deleteContact = function(index){
   this.contacts.splice(index,1);
}


AddressBook.prototype.getInitialContacts = function(cb){
   var self = this;
   setTimeout(function(){
       self.initialComplete = true;
        console.log(this);
      // console.log(initialComplete);
       
       console.log(this.initialComplete);
       
       console.log(self.initialComplete);
       console.log(self.a);
       console.log(this.a);
     //  if(cb){
        return cb;
     //  }
   },2);
}
