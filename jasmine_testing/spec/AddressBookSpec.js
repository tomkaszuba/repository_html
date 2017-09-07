describe('Address Book', function(){
    
    var addressBook, thisContact;
    
    
    beforeEach(function(){
        
        addressBook = new AddressBook(),
       thisContact = new Contact();
        
    });
    it('should be able to add a contact', function(){
       
       addressBook.addContact(thisContact);
            
       expect(addressBook.getContact(0)).toBe(thisContact);
    });
   
    it('should count', function(){
        
        expect(true).toBe(true);
        
    });
    it('should be able to deleta a contact', function(){
        
       addressBook.addContact(thisContact);
         addressBook.deleteContact(0);
          
       expect(addressBook.getContact(0)).not.toBeDefined();
    });
    
});

describe('Asynch api1', function(){
   //  var addressBook = new AddressBook();
     var value = -9;
     beforeEach(function(done) {
        
         setTimeout(function() {
      value = 0;
      done();
    }, 3);
  });
         
   it("should support async execution of test preparation and expectations", function(done) {
    
       value++;
    
    expect(value).toBeGreaterThan(0);
    done();
  });
    
   
 

});
