import Select from './select';

describe('select builder', () => {
	it('accounts for all where equals', () => {
		const qb = Select.builder()
			.select('id', 'name', 'email')
			.from('users')
			.whereIsEqual('name', 'frank')
			.whereIsEqual('email', 'warthog@wolfcola.com')
			.limit(5);

		const stmt = 'SELECT id, name, email FROM users WHERE name = ? AND email = ? LIMIT 5';
		const args = ['frank', 'warthog@wolfcola.com'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('does not include args for null predicates', () => {
		const qb = Select.builder()
			.select('id', 'name', 'email')
			.from('users')
			.whereIsNull('name')
			.whereIsNotNull('email');

		const stmt = 'SELECT id, name, email FROM users WHERE name IS NULL AND email IS NOT NULL';
		const args : unknown[] = [];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('does not include clause when check is false', () => {
		const qb = Select.builder()
			.select('id', 'name', 'email')
			.from('users')
			.whereIsEqualIf('name', 'frank', false)
			.whereIsEqual('email', 'warthog@wolfcola.com');

		const stmt = 'SELECT id, name, email FROM users WHERE email = ?';
		const args = ['warthog@wolfcola.com'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('includes order by desc clause when specified', () => {
		const qb = Select.builder()
			.select('*')
			.from('users')
			.orderBy('email', true);

		const stmt = 'SELECT * FROM users ORDER BY email DESC';

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toHaveLength(0);
	});

	it('includes order by asc clause when specified', () => {
		const qb = Select.builder()
			.select('*')
			.from('users')
			.orderBy('email', false);

		const stmt = 'SELECT * FROM users ORDER BY email ASC';

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toHaveLength(0);
	});

	it('includes limit clause when specified', () => {
		const qb = Select.builder()
			.select('*')
			.from('users')
			.limit(10);

		const stmt = 'SELECT * FROM users LIMIT 10';

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toHaveLength(0);
	});

	it('does not include limit when check is false', () => {
		const qb = Select.builder()
			.select('*')
			.from('users')
			.limitIf(10, false);

		const stmt = 'SELECT * FROM users';

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toHaveLength(0);
	});

	it('includes offset clause when specified', () => {
		const qb = Select.builder()
			.select('*')
			.from('users')
			.offset(10);

		const stmt = 'SELECT * FROM users OFFSET 10';

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toHaveLength(0);
	});

	it('does not include offset clause when check is false', () => {
		const qb = Select.builder()
			.select('*')
			.from('users')
			.offsetIf(10, false);

		const stmt = 'SELECT * FROM users';

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toHaveLength(0);
	});
});
