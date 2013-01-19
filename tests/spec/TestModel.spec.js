define(['expect', '_', 'TestModel'], function(expect, _, TestModel) {
	describe('TestModel', function() {
        it('should return square of a number', function() {
            // given
            var cut = new TestModel();
            
            // when
            var sq = cut.square(4);
            
            // then
            expect(sq).to.be.equal(16);
        });
	});
});
