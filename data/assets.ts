export interface Asset {
	id: string
	name: string
	focus: string
	description: string
}

export const assets: Asset[] = [
	{
		id: "dll3-adc",
		name: "DLL3-ADC",
		focus: "Oncology",
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
]

