export interface Asset {
	id: string
	name: string
	focus: string
	description: string
	stage: "Preclinical" | "IND Filing" | "IND Approved" | "Phase 1" | "Phase 3"
	type: "Antibody-Drug Conjugate" | "Small Molecule" | "Biologic" | "Antibody"
}

export const assets: Asset[] = [
	{
		id: "dll3-adc",
		name: "DLL3 ADC",
		focus: "Oncology",
		stage: "IND Filing",
		type: "Antibody-Drug Conjugate",
		description: `Best-in-Class Potential for SCLC & NET:
High affinity, selectivity, and internalization for superior tumor targeting.
Next-Gen Molecular Design:
Novel TOPO-1 inhibitor payload, stable cysteine conjugation, and hydrophilic cleavable linker for enhanced efficacy & safety.
Strong Preclinical Data:
Superior anti-tumor activity vs. ROVA-T, FZ-AD005, and other DLL3-ADCs, with a favorable safety profile.
Development Stage:
IND Filing submitted, and Phase I study is expected in 2025Q1.
Large Market Opportunity:
Addressing a $16.3B+ growing market with high unmet need in SCLC and neuroendocrine tumors (NET).`,
	},
	{
		id: "kif18a-inhibitor",
		name: "KIF18A Inhibitor",
		focus: "Oncology",
		stage: "Phase 1",
		type: "Small Molecule",
		description: `Best-in-Class Potential:
Highly potent KIF18A inhibitor targeting CIN+ solid tumors, with strong efficacy and safety.
Oral, Once-Daily Convenience:
A small molecule inhibitor with a favorable PK profile and broad combinability with PARP inhibitors.
First-in-Human Study Underway:
IND approved (FDA), Phase 1 ongoing in China, first patient dosed in January 2025.
Strong Preclinical Data:
Outperforms AMG650 in tumor inhibition, selectivity, and safety, with no accumulation in repeat dosing.
Large Market Potential:
Addressing high unmet needs in CIN+ tumors, TNBC, and ovarian cancers.`,
	},
	{
		id: "her2-biparatopic-adc",
		name: "HER2 Biparatopic ADC",
		focus: "Oncology",
		stage: "Phase 3",
		type: "Antibody-Drug Conjugate",
		description: `Next-Generation HER2 ADC:
Biparatopic design for enhanced binding, internalization, and bystander effect.
Proven Stability & Potency:
Utilizes the same TOPO-1 inhibitor DXd payload as Enhertu, but with superior serum stability.
Strong Preclinical & Clinical Data:
Demonstrates efficacy even in trastuzumab-insensitive tumors with lower free payload exposure vs. T-DXd.
Phase 3 Clinical Trials Ongoing in China:
2L+ HER2 low breast cancer, 2L+ HER2-positive breast cancer, Platinum-resistant ovarian cancer (PROC)
Expansive Development Pipeline:
Targeting HER2-positive & HER2-low breast, gastric, ovarian, and other solid tumors.`,
	},
	{
		id: "b7h3xpsma-adc",
		name: "B7H3xPSMA ADC",
		focus: "Oncology",
		stage: "IND Filing",
		type: "Antibody-Drug Conjugate",
		description: `First-in-Class BsADC for mCRPC:
Targets B7-H3 & PSMA to maximize tumor coverage and overcome heterogeneous expression. TOPO-1 inhibitor payload.
Addresses High Unmet Need:
Designed for metastatic castration-resistant prostate cancer (mCRPC) after prior therapy failure.
Superior to Single-Target ADCs:
Outperforms PSMA and B7-H3 ADCs in tumor binding, internalization, and bystander effect.
Broad Potential in Solid Tumors:
Therapeutic relevance in SCLC, NSCLC, HNSCC, and esophageal cancers.
Development Stage:
IND-enabling studies; IND filing in October 2025.`,
	},
	{
		id: "egfrxher2-adc",
		name: "EGFRxHER2 ADC",
		focus: "Oncology",
		stage: "IND Filing",
		type: "Antibody-Drug Conjugate",
		description: `Best-in-Class Potential BsADC:
Targets EGFR & HER2 for enhanced tumor inhibition and overcomes resistance seen in HER2-low cancers.
Optimized ADC Design:
Stable cleavable linker, potent TOPO-1 payload, and strong bystander effect improve efficacy and safety.
Broad Solid Tumor Applications:
Urothelial, gastric, colorectal, lung, ovarian, breast, and head & neck cancers.
Outperforms Standard ADCs:
More potent than Enhertu (DS-8201) with better tumor cell binding, internalization, and bystander killing.
Development Stage:
IND-enabling studies; IND filing in October 2025.`,
	},
	{
		id: "fra-biparatopic-adc",
		name: "FRα Biparatopic ADC",
		focus: "Oncology",
		stage: "IND Filing",
		type: "Antibody-Drug Conjugate",
		description: `Best-in-Class Potential Biparatopic ADC:
Targets FRα+ tumors, overcoming resistance in low & medium expressors.
Biparatopic ADC Advantage:
Dual-epitope binding enhances internalization and tumor targeting vs. conventional FRα ADCs.
Stronger Than ELAHERE (IMGN853):
Improved tumor cell binding, internalization, and broader efficacy across ovarian, endometrial, breast, and lung cancers.
Superior Payload & Stability:
Potent TOPO-1 inhibitor, stable linker, and strong bystander effect for maximum impact.
Development Stage:
IND-enabling studies; IND filing in November 2025.`,
	},
	{
		id: "pd1-agonist-mab",
		name: "PD-1 Agonist mAb",
		focus: "Immunology",
		stage: "Phase 1",
		type: "Antibody",
		description: `Best-in-Class Potential Antibody:
Highly potent PD-1 agonist antibody designed to inhibit and deplete pathogenic T cells in autoimmune diseases.
Multi-Mechanism of Action:
Selective depletion of PD-1^high^ T cells + functional agonism of PD-1+ pathogenic T cells.
Early Human Validation:
Phase 1 in progress (China); favorable safety, tolerability, and full PD-1^high^ cell engagement confirmed.
Broad Indication Potential:
RA, SLE, UC, pSS, AD—multiple autoimmune diseases with large unmet needs.
Robust Preclinical Data:
Efficacy in RA, SLE, UC, pSS mouse models with no Treg depletion or serious toxicity.`,
	},
	{
		id: "cyp11b2-inhibitor",
		name: "CYP11B2 Inhibitor",
		focus: "Cardiovascular",
		stage: "IND Filing",
		type: "Small Molecule",
		description: `Best-in-Class Potential Inhibitor:
Highly potent and selective CYP11B2 inhibitor with superior efficacy and safety over Baxdrostat in resistant hypertension.
Superior Selectivity Profile:
16x more potent CYP11B2 inhibition and ~2.5x selectivity over CYP11B1 compared to Baxdrostat.
Favorable PK & Safety:
Excellent oral exposure, long half-life, and no off-target effects or hERG liability in preclinical studies.
Rapid IND Timeline:
FDA and NMPA IND filing planned for Q4 2025, with Phase 1 expected to begin in early 2026.
Clear Differentiation:
Targets aldosterone synthesis upstream vs mineralocorticoid receptor blockade, offering fewer hormonal side effects.
Large Market Opportunity:
Addresses a $51.6B antihypertensive market with ~10M rHTN patients globally.`,
	},
	{
		id: "enpp1-inhibitor",
		name: "ENPP1 Inhibitor",
		focus: "Cardiovascular",
		stage: "IND Approved",
		type: "Small Molecule",
		description: `First-in-Class Inhibitor:
Novel ENPP1 inhibitor that enhances cardiac repair post-MI through purinergic signaling modulation.
Strong Preclinical Efficacy:
Significant improvements in EF, LVFS, and NT-proBNP in MI-induced heart failure models (rat/mouse).
High Selectivity & Safety:
Clean safety profile in >250 pharmacology targets, no CNS/cardiovascular toxicities observed.
IND-Ready in 2024:
IND submission Q4 2024, supported by robust preclinical pharmacology and GLP tox studies.
Cardiac Tissue Repair Mechanism:
Differentiated approach vs. neurohormonal antagonists—targets cardiac fibrosis and scar remodeling.
Large Market Opportunity >$24.9B HF Market:
Targets underserved post-MI HF population with high unmet need and poor survival outcomes.`,
	},
// 	{
// 		id: "b7h3-adc",
// 		name: "B7-H3 ADC",
// 		focus: "Oncology",
// 		stage: "Phase 1",
// 		type: "Antibody-Drug Conjugate",
// 		description: `Best-in-Class Potential:
// B7-H3 is overexpressed in various solid tumors, including SCLC, NSCLC, prostate cancer, HNSCC, esophageal cancer, and sarcoma.
// Differentiated Design:
// DAR (6) to balance efficacy and safety, proprietary drug linker with a strong bystander effect for tumor heterogeneity, site-specific conjugation, and Fc-silenced design to enhance exposure and reduce off-target toxicity.
// Next-Gen Molecular Design:
// Novel TOPO-1 inhibitor payload (JS-1) with higher potency than DXd; linker connected to free sulfhydryls of reduced interchain disulfide bonds.
// Strong Preclinical Data:
// Superior in vitro growth inhibition vs. DS-7300a; in LUAD and LUSC CDX models, showed dose-dependent and long-lasting antitumor activity with superior efficacy; strong activity in EC models with equal efficacy to DS-7300a.
// Favorable Safety Profile:
// Well tolerated in tox studies; target/payload-related toxicity only, no weight loss in animal models.
// Development Stage:
// IND approved by China NMPA (Dec 2024) and US FDA (Jan 2025); Phase 1 study ongoing in China in advanced solid tumors.`
// 	}
	{
		id: "b7h3-adc",
		name: "B7-H3 ADC",
		focus: "Oncology",
		stage: "Phase 1",
		type: "Antibody-Drug Conjugate",
		description: `B7-H3 ADC (SYS6043 ongoing Phase 1 Clinical Study)

Best-in-Class Potential:
B7-H3 overexpressed in multiple solid tumors (SCLC, NSCLC, prostate, HNSCC, esophagus, sarcoma).

Differentiated Design:
Site-specific conjugation (DAR 6), Fc-silenced, potent TOPO-1 inhibitor (JS-1), bystander effect linker.

Next-Gen Molecular Design:
Novel TOPO-1 inhibitor payload (JS-1) with higher potency than DXd. Linker is connected to the free sulfhydryls of reduced interchain disulfide bonds.

Preclinical Advantages:
Outperforms DS-7300a in vitro & in vivo (LUAD, LUSC, EC). Strong dose-dependent tumor regression across CDX models.

Favorable Safety Profile:
Most treatment-related adverse events (TRAE) were Grade 1 or 2, per CTCAE v5.0; No unexpected toxicities observed.

Promising Clinical Efficacy:
50% ORR in SCLC, including 1 CR; 10/24 patients with >30% tumor shrinkage; PRs observed at 4 & 6 mg/kg dose groups.`
	}
]

