# SpringBoot

JAVA 개발환경

1. JAVA SE(Standar Edition)
- JDK 다운로드 및 설치, Application 개발
- Tools : sEclipse
- Tools : Eclipse, IntellJ 등...

2. JAVA EE(Enterprise Edition)
- JDK 설치
- JAVA EE 다운로드 및 설치
- WAS(Web Application Server) : JAVA EE + 오픈소스 개발 밴더 - Tomcat, WebLogic, JEUS...
- Tools : Eclipse, IntellJ 등...

3. JAVA ME(Micro Edition)
- JDK 설치
- (1) JAVA ME 다운로드 및 설치
- (2) Android 플랫폼 (JAVA ME + Google API)







Spring 라이브러리 및 특징
--------------------------------------
IoC, DI, AOP, PSA
Spring Web
Spring Beans...

※ 숙지
제어의 역전(IoC: Inversion of Control) / 의존성 주입(DI: Dependency Injection)
Spring은 제어의 역전 지원하는 프레임워크다. 우리가 프레임워크의 API를 호출하는 것이 아니라 프레임워크가 적절한 때에 우리의 코드를 호출해준다. 예를 들어 사용자의 회원 가입 요청이 들어왔을 때 프레임워크는 우리의 회원가입 비즈니스 로직을 호출해준다.

우리는 Spring이라는 IoC 경량 컨테이너에게 우리의 제어권을 넘김으로써 객체의 라이프 사이클 관리, 흐름 제어를 위임시킬 수 있다. 덕분에 우리는 오로지 비즈니스 로직에 집중한 객체를 작성할 수 있다.

Spring은 DI를 이용해 의존성 역전을 통해 IoC를 달성한다. 만약 어떤 비즈니스 로직을 처리하기 위해서 다른 객체가 필요하다면 그 객체를 생성하는 대신 우리는 Spring에게 그 객체를 요청할 수 있다. 즉, 어떤 비즈니스 로직을 처리하기 위한 다른 객체의 의존성을 주입받을 수 있다.

덕분에 우리는 비즈니스 로직을 처리하기 위해 필요한 의존성들을 직접 관리할 필요가 없다. 수많은 의존성들을 생성하고, 사용하고, 소멸시키는 것대신 그저 요청하고 사용하는 것에만 집중할 수 있다.

그 외에도 Spring이 대신 의존성을 주입해주는 덕분에 우리는 전체 코드 수정 없이 의존성을 교체할 수 있다. 테스트 코드를 작성하면서를 MySQL 데이터베이스 의존성을 인메모리 데이터베이스로 교체하거나 인터페이스만 정의해놓으면 구현체를 주입받을 수도 있습니다.