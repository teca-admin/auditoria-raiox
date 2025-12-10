
import { AuditStats } from '../types';
import { WEBHOOK_URL, SHEET_ID, SHEET_NAME, SHEET_RANGE, MOCK_DELAY_MS } from '../constants';

/**
 * Busca os dados diretamente da Planilha Google usando a Visualization API.
 * Requer que a planilha esteja compartilhada como "Qualquer pessoa com o link pode ver".
 */
const fetchSheetData = async (): Promise<Partial<AuditStats>> => {
  const query = `select *`;
  // URL especial da API de Visualização do Google (retorna JSONP/JSON)
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}&range=${SHEET_RANGE}`;

  console.log(`[AuditService] Fetching sheet data from: ${url}`);

  const response = await fetch(url);
  const text = await response.text();

  // A resposta vem com um prefixo de segurança "/*O_o*/". Precisamos removê-lo.
  // Formato: /*O_o*/ google.visualization.Query.setResponse({ ...JSON... });
  const jsonString = text.substring(47).slice(0, -2);
  const json = JSON.parse(jsonString);

  // Parse das linhas e colunas
  // A estrutura é json.table.rows[0].c[index].v
  const row = json.table.rows[0];

  if (!row) {
    throw new Error('Nenhum dado encontrado no intervalo especificado.');
  }

  // Mapeamento baseado na ordem das colunas I, J, K
  // c[0] -> Coluna I
  // c[1] -> Coluna J
  // c[2] -> Coluna K
  const total = Number(row.c[0]?.v || 0);
  const validated = Number(row.c[1]?.v || 0);
  const invalid = Number(row.c[2]?.v || 0);
  
  // Cálculo do percentual de não conformidade (Inválidas / Total)
  const nonComplianceRate = total > 0 ? (invalid / total) * 100 : 0;

  return {
    total,
    validated,
    invalid,
    nonComplianceRate
  };
};

/**
 * Dispara o webhook e busca os dados atualizados da planilha.
 */
export const triggerAudit = async (): Promise<AuditStats> => {
  console.log(`[AuditService] Starting audit process...`);
  
  try {
    // 1. Dispara o Webhook (Fire-and-forget devido ao no-cors)
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'text/plain', 
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'web-audit-client',
        action: 'start_audit'
      })
    });
    console.log('[AuditService] Webhook triggered. Waiting for processing...');

    // 2. AGUARDA O TEMPO DEFINIDO (15s) ANTES DE BUSCAR OS DADOS
    // Isso garante que o n8n tenha tempo de rodar e atualizar a planilha.
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS));

    console.log('[AuditService] Wait time over. Fetching updated data...');
    
    // 3. Busca os dados reais da planilha
    const sheetData = await fetchSheetData();
    console.log('[AuditService] Sheet Data received:', sheetData);

    return {
      total: sheetData.total || 0,
      validated: sheetData.validated || 0,
      invalid: sheetData.invalid || 0,
      nonComplianceRate: sheetData.nonComplianceRate || 0
    };

  } catch (error) {
    console.error('[AuditService] Process Failed:', error);
    
    // Fallback apenas em caso de erro crítico de conexão
    return { total: 0, validated: 0, invalid: 0, nonComplianceRate: 0 };
  }
};
