# knex-example

## 개요
- `knex` 예제 

## DBMS 메모
### database & schema
- 각 DBMS 별로 데이터베이스와 스키마에 대한 정의가 약간 다름
- 기본적으로 데이터베이스 > 스키마 > 오브젝트(테이블 등)의 관계
- Oracle에서 스키마는 임의의 사용자(user, owner)가 생성한 오브젝트들을 의미하고 스키마 이름은 사용자 이름과 같으므로 사용자와 스키마가 같은 개념
- MySQL은 데이터베이스와 스키마를 같이 취급하고 혼용해서 사용함 (워크벤치에서도 데이터베이스 생성이 아니라 스키마 생성으로 표기됨)
- PostgreSQL은 데이터베이스와 스키마를 구분하되 데이터베이스별로 기본 스키마(`public`)가 자동으로 생성됨
### PostgreSQL
- 최초에 스키마가 없는 상태에서 `knex`로 생성하는 경우 접속시 디폴트 스키마(`public`)에 마이그레이션 테이블(`knex_migrations`, `knex_migrations_lock`)이 생성됨
- 스키마 생성 후에는 마이그레이션 진행시 해당 스키마에 마이그레이션 테이블을 생성하므로 두 군데에 마이그레이션 테이블 생성됨
- 그러므로 깔끔하게 진행하려면 스키마는 외부에서 생성하고 `knex`에서는 해당 스키마로 접속하여 마이그레이션 진행할 것
### Oracle
- Mac에서 Node.js로 Oracle에 접속하려면 `oracledb`외에도 [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html)를 설치해야 함
- 오라클은 `oracleinanutshell/oracle-xe-11g`를 도커로 띄웠고 클라이언트도 11버전에 맞춰야겠다는 생각에 문서의 'Installing Instant Client 11.2 on macOS'를 참고하여 압축을 풀고 패스를 잡았지만 에러 (문서에 지원 맥 버전이 매버릭스까지임)
  - 오라클의 [공식 깃헙 저장소](https://github.com/oracle/docker-images)에 다른 공식 이미지들이 있으니 시도해볼 것
- 최신버전인 'Installing Instant Client 19.8 on macOS'를 보니 빅서까지 지원하고 오라클 11g도 지원하기에 문서대로 이 버전의 dmg를 이용해 `install_ic.sh` 스크립트를 실행하여 설치
  - 문서에서 스크립트를 실행하는 1~4번 과정대로만 하면 완료되고 나머지 과정은 불필요함
  - 이 스크립트는 dmg내의 파일들을 `/Users/${USER}/Downloads/instantclient_19_8`위치에 복사함
  - 그래서 다운로드 폴더가 아닌 임의의 위치에 파일들을 옮기고 패스를 걸었는데 노드 앱을 실행시 확인된 개발자가 아니라고 실행 거부됨 
  - 보안 환경설정에서 허용해주어도 결국 실행되지 않았음
  - 스크립트의 복사 위치를 수정한 후 새로 dmg를 패키징하면 될 것 같은데 귀찮아서 하지 않음
  - 결론은 `Oracle Instant Client`는 `/Users/${USER}/Downloads/instantclient_19_8` 위치에 설치됨
- 노드 앱에서는 `oracledb`를 임포트하고 `oracledb.initOracleClient({libDir: '/Users/soriwa/Downloads/instantclient_19_8'});` 구문을 이용해 오라클 클라이언트의 위치를 지정하여 초기화해야 작동함
- `oracleinanutshell/oracle-xe-11g` 이미지의 계정이 `system`이므로 같은 이름의 스키마에 마이그레이션 테이블(`knex_migrations`, `knex_migrations_lock`)과 대상 테이블(`user`, `product`)이 생성됨
  - `DBeaver`에서는 `system` 스키마가 나타나지 않아 확인이 안되었고 `SQLDeveloper`에서 확인함
## 작업일지
### 2022-06-24
- 마이그레이션 파일 생성
  - `npx knex migrate:make dev`
  - `migrations` 폴더에 `timestamp_dev.js` 파일 생성
  - `up`, `down` 함수를 노출하는 파일
- 시드 파일 생성
  - `npx knex seed:make dev`
  - `seeds` 폴더에 `dev.js` 파일 생성
- 마이그레이션 실행
  - `npx knex migrate:up 20220624055248_dev.js`로 테이블 생성
    - `knex migrate:latest`을 실행하면 `migrations` 폴더의 파일들을 최신순으로 모두 실행하므로 주의할 것
  - `npx knex migrate:down 20220624055248_dev.js`로 생성된 테이블 삭제
- 시드 실행
  - `npx knex seed:run`
    - 알파벳순으로 모든 시드 파일을 처리함
- 마이그레이션과 시드 과정을 sqlite3가 아닌 오라클에서도 진행함
### 2022-06-23
- 패키지 업데이트
- before
```json
"dependencies": {
  "knex": "^0.21.1",
  "mysql2": "^2.1.0",
  "pg": "^8.2.1"
}
```
- after
```json
"dependencies": {
  "better-sqlite3": "^7.5.3",
  "knex": "^2.1.0",
  "mysql2": "^2.3.3"
}
```
### 2020-07-01
- 프로젝트 생성
- `PostgreSQL` 마이그레이션 
