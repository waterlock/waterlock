REPORTER = spec
MOCHA = ./node_modules/.bin/mocha
SAILS = ./node_modules/.bin/sails
WATERLOCK = ./node_modules/.bin/waterlock
JSHINT = ./node_modules/.bin/jshint
ISTANBUL = ./node_modules/.bin/istanbul
TESTAPP = _testapp

ifeq (true,$(COVERAGE))
test: jshint coverage
else
test: jshint provision base clean
endif

base:
	@echo "running mocha tests..."
	@NODE_ENV=test $(MOCHA) \
	--colors \
    --reporter $(REPORTER) \
    --recursive \
	tests
	
coveralls:
	@echo "running mocha tests with coveralls..."
	@NODE_ENV=test $(ISTANBUL) \
	cover ./node_modules/mocha/bin/_mocha \
	--report lcovonly \
	-- -R $(REPORTER) \
	--recursive \
	tests && \
	cat ./coverage/lcov.info |\
	 ./node_modules/coveralls/bin/coveralls.js && \
	 rm -rf ./coverage

provision:
	@echo "provisioning..."
	$(SAILS) new $(TESTAPP)
	cd $(TESTAPP) && \
	pwd && \
	npm install ../ && \
	npm install git+https://git@github.com/davidrivera/waterlock-local-auth.git  && \
	$(WATERLOCK) install all

localauth:
	npm install git@github.com:davidrivera/waterlock-local-auth.git 

jshint:
	@echo "running lint..."
	$(JSHINT) lib	

clean:
	@echo "clean..."
	rm -rf $(TESTAPP)

coverage: provision coveralls clean


.PHONY: test base coveralls coverage provision