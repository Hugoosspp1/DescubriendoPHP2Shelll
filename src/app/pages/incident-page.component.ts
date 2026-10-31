import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dps-incident',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-heading">
      <div class="eyebrow">CONTEXTO, IMPACTO Y CRONOLOGÍA</div>
      <h1>El incidente PHP2Shell</h1>
      <p>PHP2Shell es el nombre que se usa para dos fallos graves en PHP, el programa que puede funcionar detrás de una web. «Shell» se refiere al lugar desde el que se pueden dar órdenes a un servidor. El nombre resume el riesgo: una visita podría acabar dando órdenes al servidor. Los fallos se anunciaron el 21 de octubre de 2026.</p>
    </div>

    <div class="notice"><strong>Nota sobre el nombre</strong>El enunciado menciona «php2bash»; las fuentes llaman PHP2Shell a los dos fallos CVE-2026-109618 y CVE-2026-109619. CVE es el número público que identifica cada problema de seguridad. Este informe cubre esos dos fallos.</div>

    <div class="notice"><strong>Situación a 31 de octubre de 2026</strong>PHP ya publicó actualizaciones que corrigen los dos fallos principales. El 27 de octubre, el Centro Canadiense recogió informes públicos de ataques en curso; la agencia de ciberseguridad de Estados Unidos los añadió a su lista de fallos usados en ataques el 26. Eso no demuestra que hayan entrado en un sistema concreto: para saberlo hay que revisar sus propios registros.</div>

    <div class="content-grid" style="margin-top:0">
      <section class="panel">
        <span class="pill">EXPLICADO SIN COMPLICACIONES</span>
        <div class="article-body">
          <h2>Fallo 1: CVE-2026-109618</h2>
          <p>Cuando PHP recibe una visita, usa memoria del servidor para preparar la respuesta. En algunos casos, si se queda sin memoria mientras prepara una petición, deja a medio hacer una nota interna. Al limpiar después, puede confundir esa nota incompleta con una válida y dañar su propia memoria.</p>
          <p>Una petición puede incluir un formulario con campos y archivos adjuntos. PHP procesa ese contenido antes de que la aplicación pueda decidir qué hacer. Si el servidor tiene límites o ajustes concretos, una petición preparada para consumir mucha memoria puede provocar el fallo. Por eso una contraseña o un formulario de inicio de sesión no protegen por sí solos al servidor.</p>
          <p>El equipo de PHP considera que Apache con PHP integrado es el caso más preocupante: el fallo puede ocurrir antes de que empiece el programa de la web. También pide actualizar PHP-FPM, otra forma habitual de ejecutar PHP, y cualquier otro tipo de instalación que reciba visitas.</p>

          <h2>Fallo 2: CVE-2026-109619</h2>
          <p>Algunos servidores mantienen un trabajador que atiende muchas visitas una detrás de otra. Si una visita anterior termina con un error, PHP puede conservar por equivocación una referencia a datos que ya borró. Una visita posterior que llegue al mismo trabajador puede hacer que use esa referencia vieja como si los datos siguieran allí.</p>
          <p>Es como guardar una nota que dice dónde está una caja, tirar la caja y luego usar esa nota para buscarla. En un ordenador, ese error puede desordenar la memoria y, en determinadas condiciones, permitir que la petición altere lo que hace el servidor. El riesgo depende de cómo esté configurado el servicio y de qué errores pueda provocar una visita.</p>
        </div>
        <div class="tag-row"><span class="tag">Fallos: CVE-2026-109618 y CVE-2026-109619</span><span class="tag">Gravedad oficial: 9,2 de 10 cada uno</span><span class="tag">Puede bastar una visita preparada; no hace falta iniciar sesión</span></div>
        <div class="inline-actions">
          <a class="text-link" href="https://www.cve.org/CVERecord?id=CVE-2026-109618" target="_blank" rel="noopener">Registro CVE-2026-109618 ↗</a>
          <a class="text-link" href="https://www.cve.org/CVERecord?id=CVE-2026-109619" target="_blank" rel="noopener">Registro CVE-2026-109619 ↗</a>
        </div>
      </section>

      <aside class="panel">
        <h2>¿Qué podría conseguir un atacante?</h2>
        <p class="panel-intro">El daño depende de qué puede hacer la cuenta del servidor y a qué archivos o servicios tiene acceso.</p>
        <div class="timeline">
          <div class="timeline-item"><span class="timeline-marker">1</span><div><strong>Dar órdenes al servidor</strong><p>Podría intentar ejecutar programas usando la cuenta limitada con la que funciona la web.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">2</span><div><strong>Leer información a la que esa cuenta llega</strong><p>Por ejemplo, archivos de la aplicación o claves guardadas allí para conectarse a una base de datos. No significa automáticamente que pueda leerlo todo.</p></div></div>
          <div class="timeline-item"><span class="timeline-marker">3</span><div><strong>Alterar la web o dejarla fuera de servicio</strong><p>Podría modificar archivos accesibles, intentar entrar en otros servicios o provocar errores y lentitud.</p></div></div>
        </div>
        <div class="notice"><strong>Un fallo no demuestra que hubiera una intrusión</strong>Saber que el servidor tenía una versión vulnerable significa que debía actualizarse. Para afirmar que alguien entró hacen falta señales del propio servidor.</div>
      </aside>
    </div>

    <section class="panel" style="margin-top:17px">
      <h2>¿Puede quedar expuesta información privada?</h2>
      <div class="article-body">
        <p>Sí. El equipo que descubrió PHP2Shell informó que uno de los fallos también podía hacer que PHP enviara trozos de la memoria que estaba usando. Piensa en esa memoria como una mesa temporal donde el servidor deja papeles mientras trabaja. En esos papeles podría haber datos de otras visitas atendidas por el mismo proceso: por ejemplo, partes de contraseñas, claves de acceso o información de la propia aplicación.</p>
        <p>Wiz explicó que, en sus pruebas, PHP llegó a devolver fragmentos de memoria en una cookie de sesión llamada <code>PHPSESSID</code>. Una cookie es un pequeño dato que el navegador guarda para que la web recuerde la sesión. Esto no significa que todos los servidores hayan perdido contraseñas ni que siempre aparezca información útil: depende de los datos que estuvieran en memoria y de la instalación.</p>
        <p>Los fallos están en PHP, el programa del servidor. Por eso el problema no se limita a WordPress o Drupal: cualquier página puede quedar expuesta si usa una versión vulnerable de PHP. Actualizar Laravel o Angular por sí solo no corrige el PHP del servidor.</p>
      </div>
      <div class="notice"><strong>Qué significa para TwinTeach</strong>Si el equipo encuentra señales de entrada, debe comprobar qué información podía leer la cuenta que ejecuta PHP. Si hay indicios de que se vieron contraseñas o claves, cámbialas después de contener el problema.</div>
      <a class="text-link" href="https://www.wiz.io/blog/php2shell-php-rce" target="_blank" rel="noopener">Detalles de las pruebas que publicó Wiz ↗</a>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>¿Por qué se descubrió y cuándo?</h2>
      <div class="article-body">
        <p>El equipo de Wiz revisó el código que hace funcionar PHP y usó herramientas de inteligencia artificial como ayudantes para buscar errores difíciles de ver y comprobar si podían juntarse para causar daño. La inteligencia artificial ayudó a investigar; no creó el fallo. Según el informe de Wiz, el código llevaba más de diez años en PHP: no apareció de repente en octubre de 2026.</p>
        <p>Fechas: Wiz encontró el primer fallo el <strong>19 de agosto de 2026</strong>; el 20 y 21 de agosto comprobó que podía afectar a webs de prueba hechas con Drupal y WordPress. Avisó en privado al equipo de PHP el 24 de agosto. PHP confirmó que estaba trabajando en el arreglo el 21 de septiembre. La actualización y el anuncio público llegaron el 21 de octubre. Son fechas publicadas por Wiz.</p>
      </div>
      <div class="tag-row"><span class="tag">Primer hallazgo: 19 ago 2026</span><span class="tag">Aviso a PHP: 24 ago 2026</span><span class="tag">Divulgación y parche: 21 oct 2026</span></div>
      <a class="text-link" href="https://www.wiz.io/blog/php2shell-php-rce" target="_blank" rel="noopener">Leer el informe y la cronología de Wiz ↗</a>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>Cronología conocida</h2>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Fecha</th><th>Hecho documentado</th><th>Fuente / lectura</th></tr></thead><tbody>
        <tr><td>19 ago 2026</td><td>Wiz encontró el primer fallo al revisar el código de PHP con ayuda de herramientas de IA.</td><td>El fallo llevaba años en el código; entonces se descubrió que podía ser peligroso.</td></tr>
        <tr><td>20–21 ago 2026</td><td>Wiz comprobó el problema en webs de prueba hechas con Drupal y WordPress.</td><td>Pruebas de los investigadores; no significa que esas webs fueran atacadas.</td></tr>
        <tr><td>24 ago / 21 sep 2026</td><td>Wiz avisó en privado a PHP el 24 de agosto. PHP reconoció los fallos el 21 de septiembre y preparó el arreglo.</td><td>Se dio tiempo a PHP para preparar las actualizaciones antes de contarlo al público.</td></tr>
        <tr><td>17 oct 2026</td><td>AWS vio un intento contra uno de sus servidores señuelo, cuatro días antes del anuncio público.</td><td>Un servidor señuelo es un equipo preparado para atraer y observar ataques. AWS no pudo confirmar que el intento hubiera funcionado en una web real.</td></tr>
        <tr><td>20 oct 2026</td><td>El equipo de seguridad de PHP anunció que preparaba una publicación crítica para el día siguiente y pidió a los operadores que estuvieran listos.</td><td>Preaviso oficial en el archivo de noticias de PHP.</td></tr>
        <tr><td>21 oct 2026</td><td>PHP hizo públicos los fallos y publicó actualizaciones para las versiones 8.2, 8.3, 8.4 y 8.5.</td><td>Las dos recibieron una puntuación de gravedad de 9,2 sobre 10.</td></tr>
        <tr><td>23 oct 2026</td><td>PHP avisó de otro problema poco común relacionado con los ajustes de las sesiones y la subida de archivos. Se identifica como CVE-2026-115560.</td><td>Es un aviso distinto de los dos fallos principales de PHP2Shell.</td></tr>
        <tr><td>26–27 oct 2026</td><td>La agencia de ciberseguridad de Estados Unidos añadió los fallos a su lista de vulnerabilidades usadas en ataques. Canadá citó informes públicos de ataques en curso.</td><td>Son avisos para actuar rápido; cada organización debe revisar sus propios equipos para saber si fue afectada.</td></tr>
      </tbody></table></div>
      <div class="inline-actions" style="margin-top:13px">
        <a class="text-link" href="https://www.wiz.io/blog/php2shell-php-rce" target="_blank" rel="noopener">Descubrimiento y divulgación de Wiz ↗</a>
        <a class="text-link" href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/" target="_blank" rel="noopener">Cronología de AWS ↗</a>
        <a class="text-link" href="https://www.php.net/archive/2026.php" target="_blank" rel="noopener">Archivo oficial de PHP ↗</a>
        <a class="text-link" href="https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619" target="_blank" rel="noopener">Alerta actualizada de Canadá ↗</a>
      </div>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>Otro aviso que conviene revisar por separado</h2>
      <div class="article-body">
        <p>El 23 de octubre, PHP avisó de un tercer problema, llamado <strong>CVE-2026-115560</strong>. No es uno de los dos fallos principales. Solo puede ocurrir si el programa de la web cambia, mientras funciona, el modo en que guarda las sesiones de usuario y deja activa una función que muestra el avance de las cargas.</p>
        <p>Para comprobarlo, el equipo de TwinTeach puede buscar en su código si cambia el ajuste <code>session.serialize_handler</code> durante la ejecución y preguntar al administrador si <code>session.upload_progress.enabled</code> sigue activo. PHP recomendaba apagar este último ajuste hasta publicar una corrección. Consulta su aviso más reciente antes de hacer cambios.</p>
      </div>
      <a class="text-link" href="https://www.php.net/archive/2026.php" target="_blank" rel="noopener">Aviso informativo de PHP, 23 oct ↗</a>
    </section>

    <section class="panel" style="margin-top:17px">
      <h2>Interpretación de la evidencia</h2>
      <div class="article-body">
        <ul>
          <li>La nota de gravedad indica lo serio que puede ser un fallo. No indica que un atacante haya entrado en un servidor concreto.</li>
          <li>El fabricante del servidor puede incluir el arreglo sin cambiar el número principal que se ve. Por eso se revisa el aviso del proveedor y el paquete realmente instalado.</li>
          <li>Que una agencia avise de ataques significa que hay que actuar pronto; no demuestra que el equipo de tu organización haya sido atacado.</li>
          <li>Una dirección de Internet publicada puede ser usada por muchas personas. Comprueba la hora, la petición y lo que hizo el servidor antes de sacar conclusiones.</li>
          <li>Si no encuentras una señal en los registros no siempre significa que no pasara nada: quizá no se guardó o ya se borró. Conserva los registros disponibles.</li>
        </ul>
      </div>
      <div class="inline-actions"><a class="text-link" routerLink="/versiones">Ver qué versiones actualizar →</a><a class="text-link" routerLink="/forense">Buscar señales de un ataque →</a></div>
    </section>
  `,
})
export class IncidentPageComponent {}
