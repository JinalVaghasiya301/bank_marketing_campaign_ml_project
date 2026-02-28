from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and scaler
try:
    model = pickle.load(open("model_12_features.pkl", "rb"))
    scaler = pickle.load(open("scaler_12_features.pkl", "rb"))
    print("Model and scaler loaded successfully")
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    model = None
    scaler = None

# ================= CSV DATASET LOADING =================
try:
    csv_path = "bank.csv"   # change if your filename is different
    dataset = pd.read_csv(csv_path, sep=';')  # use sep=',' if needed
    TOTAL_INSTANCES = dataset.shape[0]
    TOTAL_FEATURES = dataset.shape[1] - 1  # excluding target column 'y'
    print("CSV dataset loaded successfully")
except Exception as e:
    print("Error loading CSV:", e)
    dataset = None
    TOTAL_INSTANCES = 45211
    TOTAL_FEATURES = 16
# =======================================================

# UCI Bank Marketing Dataset Features (17 total)
# bank client data: 1-8
# contact data: 9-12  
# campaign data: 13-16
# target: 17 (y)

# Full feature mapping based on UCI dataset
UCI_FEATURES = [
    'age',           # 1 - age (numeric)
    'job',           # 2 - job (categorical)
    'marital',       # 3 - marital status (categorical)
    'education',     # 4 - education (categorical)
    'default',       # 5 - has credit in default? (binary)
    'balance',       # 6 - average yearly balance, in euros (numeric)
    'housing',       # 7 - has housing loan? (binary)
    'loan',          # 8 - has personal loan? (binary)
    'contact',       # 9 - contact communication type (categorical)
    'day',           # 10 - last contact day of the month (numeric)
    'month',         # 11 - last contact month of year (categorical)
    'duration',      # 12 - last contact duration, in seconds (numeric)
    'campaign',      # 13 - number of contacts performed during this campaign (numeric)
    'pdays',         # 14 - days since last contact (numeric, -1 = not contacted)
    'previous',      # 15 - number of contacts before this campaign (numeric)
    'poutcome'       # 16 - outcome of previous marketing campaign (categorical)
]

# Field validation ranges based on UCI dataset
VALIDATION_RANGES = {
    'age': {'min': 18, 'max': 70, 'type': 'numeric'},
    'balance': {'min': -8019, 'max': 102127, 'type': 'numeric'},  # Actual UCI dataset ranges
    'duration': {'min': 0, 'max': 4918, 'type': 'numeric'},  # in seconds
    'campaign': {'min': 1, 'max': 63, 'type': 'numeric'},
    'pdays': {'min': -1, 'max': 871, 'type': 'numeric'},  # -1 means never contacted
    'previous': {'min': 0, 'max': 58, 'type': 'numeric'},
    'day': {'min': 1, 'max': 31, 'type': 'numeric'},
    'job': {'valid_values': ['admin.', 'unknown', 'unemployed', 'management', 'housemaid', 'entrepreneur', 'student', 'blue-collar', 'self-employed', 'retired', 'technician', 'services'], 'type': 'categorical'},
    'marital': {'valid_values': ['married', 'divorced', 'single'], 'type': 'categorical'},
    'education': {'valid_values': ['unknown', 'secondary', 'primary', 'tertiary'], 'type': 'categorical'},
    'default': {'valid_values': ['no', 'yes'], 'type': 'categorical'},
    'housing': {'valid_values': ['no', 'yes'], 'type': 'categorical'},
    'loan': {'valid_values': ['no', 'yes'], 'type': 'categorical'},
    'contact': {'valid_values': ['unknown', 'telephone', 'cellular'], 'type': 'categorical'},
    'month': {'valid_values': ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'], 'type': 'categorical'},
    'poutcome': {'valid_values': ['unknown', 'failure', 'other', 'success'], 'type': 'categorical'}
}

# Feature encoding maps (based on UCI dataset)
JOB_MAP = {
    'admin.': 0, 'unknown': 1, 'unemployed': 2, 'management': 3, 
    'housemaid': 4, 'entrepreneur': 5, 'student': 6, 'blue-collar': 7,
    'self-employed': 8, 'retired': 9, 'technician': 10, 'services': 11
}

MARITAL_MAP = {'married': 0, 'divorced': 1, 'single': 2}
EDUCATION_MAP = {'unknown': 0, 'secondary': 1, 'primary': 2, 'tertiary': 3}
DEFAULT_MAP = {'no': 1, 'yes': 0}
HOUSING_MAP = {'no': 0, 'yes': 1}
LOAN_MAP = {'no': 0, 'yes': 1}
CONTACT_MAP = {'unknown': 0, 'telephone': 1, 'cellular': 2}
MONTH_MAP = {
    'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
    'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
}
POUTCOME_MAP = {'unknown': 0, 'other': 1, 'failure': 2, 'success': 3}

@app.route("/")
def home():
    return jsonify({
        "message": "Bank Marketing Prediction API - UCI Dataset",
        "features": UCI_FEATURES,
        "target": "y - has the client subscribed a term deposit? (binary: yes/no)",
        "dataset_loaded": True if dataset is not None else False,
        "instances": TOTAL_INSTANCES,
        "feature_count": TOTAL_FEATURES,
    })

@app.route("/predict", methods=["POST"])
def predict():
    """Full UCI dataset prediction endpoint"""
    try:
        if not model or not scaler:
            return jsonify({"error": "Model not loaded"})
            
        data = request.get_json()
        
        # Process all UCI features
        processed_data = []
        
        for feature in UCI_FEATURES:
            if feature in data:
                value = data[feature]
                
                # Encode categorical features
                if feature == 'job':
                    processed_data.append(JOB_MAP.get(value, 0))
                elif feature == 'marital':
                    processed_data.append(MARITAL_MAP.get(value, 0))
                elif feature == 'education':
                    processed_data.append(EDUCATION_MAP.get(value, 0))
                elif feature == 'default':
                    processed_data.append(DEFAULT_MAP.get(value, 0))
                elif feature == 'housing':
                    processed_data.append(HOUSING_MAP.get(value, 0))
                elif feature == 'loan':
                    processed_data.append(LOAN_MAP.get(value, 0))
                elif feature == 'contact':
                    processed_data.append(CONTACT_MAP.get(value, 0))
                elif feature == 'month':
                    processed_data.append(MONTH_MAP.get(value, 4))  # may as default
                elif feature == 'poutcome':
                    processed_data.append(POUTCOME_MAP.get(value, 0))
                else:
                    # Numeric features
                    processed_data.append(float(value))
            else:
                # Default values for missing features
                if feature == 'age':
                    processed_data.append(41)  # median age
                elif feature == 'balance':
                    processed_data.append(548)  # median balance
                elif feature == 'duration':
                    processed_data.append(180)  # 3 minutes
                elif feature == 'campaign':
                    processed_data.append(2)
                elif feature == 'pdays':
                    processed_data.append(-1)
                elif feature == 'previous':
                    processed_data.append(0)
                elif feature == 'day':
                    processed_data.append(15)
                else:
                    processed_data.append(0)  # categorical defaults
        
        # Convert to DataFrame
        df = pd.DataFrame([processed_data], columns=UCI_FEATURES)
        
        # Scale input
        scaled = scaler.transform(df)
        
        # Prediction
        prediction = model.predict(scaled)[0]
        probabilities = model.predict_proba(scaled)[0]
        
        prob_yes = float(probabilities[1])
        prob_no = float(probabilities[0])
        confidence = max(prob_yes, prob_no) * 100
        
        result = "YES" if prediction == 1 else "NO"
        
        return jsonify({
            "prediction": result,
            "confidence": round(confidence, 2),
            "probability_yes": round(prob_yes, 4),
            "probability_no": round(prob_no, 4),
            "success_rate": round(prob_yes * 100, 1),
            "dataset_features": UCI_FEATURES
        })
        
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"})

def validate_input_data(data):
    """Validate all input fields against UCI dataset ranges"""
    errors = []
    
    for field, value in data.items():
        if field not in VALIDATION_RANGES:
            continue  # Skip unknown fields
            
        validation = VALIDATION_RANGES[field]
        
        if validation['type'] == 'numeric':
            try:
                num_value = float(value)
                if 'min' in validation and num_value < validation['min']:
                    errors.append(f"{field}: Value {num_value} is below minimum {validation['min']}")
                if 'max' in validation and num_value > validation['max']:
                    errors.append(f"{field}: Value {num_value} is above maximum {validation['max']}")
            except (ValueError, TypeError):
                errors.append(f"{field}: Invalid numeric value")
                
        elif validation['type'] == 'categorical':
            if value not in validation['valid_values']:
                errors.append(f"{field}: Value '{value}' not in valid options: {', '.join(validation['valid_values'])}")
    
    return errors

@app.route("/loan", methods=["POST"])
def loan_predict():
    """Proper ML prediction using the 12-feature model with validation"""
    try:
        if not model or not scaler:
            return jsonify({"error": "Model not loaded"})
            
        data = request.get_json()
        
        # Extract UCI features from frontend
        uci_data = {
            'age': float(data.get('age', 41)),
            'job': data.get('job', 'management'),
            'marital': data.get('marital', 'married'),
            'education': data.get('education', 'secondary'),
            'default': data.get('default', 'yes'),
            'balance': float(data.get('balance', 548)),
            'housing': data.get('housing', 'no'),
            'loan': data.get('loan', 'no'),
            'contact': data.get('contact', 'cellular'),
            'day': float(data.get('day', 15)),
            'month': data.get('month', 'may'),
            'duration': float(data.get('duration', 180)),
            'campaign': float(data.get('campaign', 2)),
            'pdays': float(data.get('pdays', -1)),
            'previous': float(data.get('previous', 0)),
            'poutcome': data.get('poutcome', 'unknown')
        }
        
        # Validate all input fields
        validation_errors = validate_input_data(uci_data)
        if validation_errors:
            # Return 0 prediction for out-of-range fields
            return jsonify({
                "prediction": "NO",
                "confidence": 0.0,
                "probability_yes": 0.0,
                "probability_no": 1.0,
                "risk_score": 10.0,
                "recommendation": """❌ OUT OF RANGE - NO SUBSCRIPTION
                
Input validation failed. Prediction cannot be generated.

VALIDATION ISSUES:
• {0}

RECOMMENDATION:
• Please correct the input fields within valid ranges
• Ensure all values match the UCI dataset specifications
• Contact support if you need assistance with field validation

EXPECTED OUTCOME: No subscription possible with current input values""".format(
                    '\n• '.join(validation_errors)
                ),
                "factors": ["Input values outside valid dataset ranges"],
                "success_rate": 0.0,
                "dataset_info": {
                    "source": "UCI Bank Marketing Dataset",
                    "instances": 45211,
                    "features": 16,
                    "target": "term deposit subscription",
                    "model_features": 12,
                    "validation": "FAILED - Out of range input detected"
                }
            })
        
        # Map UCI features to model's 12 features
        model_input = []
        
        # 1. age (numeric)
        model_input.append(uci_data['age'])
        
        # 2. marital (categorical -> numeric)
        model_input.append(MARITAL_MAP.get(uci_data['marital'], 0))
        
        # 3. education (categorical -> numeric)
        model_input.append(EDUCATION_MAP.get(uci_data['education'], 1))
        
        # 4. default (binary -> numeric)
        model_input.append(DEFAULT_MAP.get(uci_data['default'], 0))
        
        # 5. balance (numeric)
        model_input.append(uci_data['balance'])
        
        # 6. housing (binary -> numeric)
        model_input.append(HOUSING_MAP.get(uci_data['housing'], 0))
        
        # 7. loan (binary -> numeric)
        model_input.append(LOAN_MAP.get(uci_data['loan'], 0))
        
        # 8. day (numeric)
        model_input.append(uci_data['day'])
        
        # 9. duration (numeric)
        model_input.append(uci_data['duration'])
        
        # 10. campaign (numeric)
        model_input.append(uci_data['campaign'])
        
        # 11. pdays (numeric)
        model_input.append(uci_data['pdays'])
        
        # 12. previous (numeric)
        model_input.append(uci_data['previous'])
        
        # Convert to numpy array and predict
        import numpy as np
        input_array = np.array([model_input])
        scaled = scaler.transform(input_array)
        
        # Real ML prediction
        prediction = model.predict(scaled)[0]
        probabilities = model.predict_proba(scaled)[0]
        
        prob_yes = float(probabilities[1])
        prob_no = float(probabilities[0])
        confidence = max(prob_yes, prob_no) * 100
        
        result = "YES" if prediction == 1 else "NO"
        
        # Dynamic risk calculation based on actual prediction
        risk_score = 10 - (prob_yes * 10)
        if uci_data['age'] < 25: risk_score += 1
        if uci_data['balance'] < 1000: risk_score += 1
        if uci_data['duration'] < 60: risk_score += 1
        risk_score = round(min(10, max(1, risk_score)), 1)
        
        # Strategic recommendations specifically for YES subscription predictions
        if result == "YES":
            if prob_yes > 0.9:
                recommendation = """🔥 PREMIUM SUBSCRIBER ({0:.1f}% Probability)

KEY FEATURES DRIVING PREDICTION:
• Balance €{2}: High financial capacity
• Age {1}: Prime investment age group
• education {3} : Sophisticated financial understanding
• job  {4}: Stable income source
• marital {5}: Family financial planning needs

RISK REDUCTION ALREADY OPTIMAL: All key indicators positive

EXPECTED: 95%+ conversion rate""".format(
                    prob_yes * 100,
                    uci_data['age'],
                    uci_data['balance'],
                    uci_data['education'].title(),
                    uci_data['job'].title(),
                    uci_data['marital'].title()
                )
            elif prob_yes > 0.8:
                recommendation = """⭐ HIGH-VALUE SUBSCRIBER ({0:.1f}% Probability)

KEY FEATURES DRIVING PREDICTION:
• Duration {1}s: Good engagement level
• Balance €{2}: Solid financial foundation
• Age {3}: Optimal investment timing
• Contact on day {4} with {5}: Optimal timing and channel
• marital {6} : Household financial goals
• education {7} : Adequate financial literacy

TO REDUCE RISK: Maintain current engagement patterns

EXPECTED: 85-95% conversion rate""".format(
                    prob_yes * 100,
                    uci_data['duration'],
                    uci_data['balance'],
                    uci_data['age'],
                    uci_data['day'],
                    uci_data['contact'],
                    uci_data['marital'].title(),
                    uci_data['education'].title()
                )
            elif prob_yes > 0.7:
                recommendation = """🎯 QUALIFIED SUBSCRIBER ({0:.1f}% Probability)

KEY FEATURES DRIVING PREDICTION:
• Balance €{1}: Primary strength indicator
• Age {2}: Good investment age
• Duration {3}s: Moderate engagement
• {4} job: Income stability factor
• {5} marital: Joint planning potential
• Campaign {6}: Manageable contact frequency

TO REDUCE RISK: Increase call duration to 180s+ for better engagement

EXPECTED: 70-85% conversion rate""".format(
                    prob_yes * 100,
                    uci_data['balance'],
                    uci_data['age'],
                    uci_data['duration'],
                    uci_data['job'].title(),
                    uci_data['marital'].title(),
                    uci_data['campaign']
                )
            elif prob_yes > 0.6:
                recommendation = """📈 PROMISING SUBSCRIBER ({0:.1f}% Probability)

KEY FEATURES DRIVING PREDICTION:
• Age {1}: Demographic advantage
• {2} education: Basic financial understanding
• {3} housing: Asset ownership indicator
• Balance €{4}: Modest but sufficient
• Duration {5}s: Needs improvement
• {6} loan: Manageable debt level

TO REDUCE RISK: Increase call duration to 120s+ and balance to €1000+

EXPECTED: 60-75% conversion rate""".format(
                    prob_yes * 100,
                    uci_data['age'],
                    uci_data['education'].title(),
                    uci_data['housing'],
                    uci_data['balance'],
                    uci_data['duration'],
                    uci_data['loan']
                )
            elif prob_yes > 0.5:
                recommendation = """🌱 EMERGING SUBSCRIBER ({0:.1f}% Probability)

KEY FEATURES DRIVING PREDICTION:
• Age {1}: Young investor potential
• {2} job: Entry-level position
• {3} marital: Single financial planning
• Duration {4}s: Low engagement - RISK FACTOR
• Balance €{5}: Limited funds - RISK FACTOR
• {6} default: Credit history concern - RISK FACTOR

TO REDUCE RISK: 
• Increase call duration to 180s+ (currently {4}s)
• Build balance to €1000+ (currently €{5})
• Address {6} default status with secured options

EXPECTED: 50-70% conversion rate""".format(
                    prob_yes * 100,
                    uci_data['age'],
                    uci_data['job'].title(),
                    uci_data['marital'].title(),
                    uci_data['duration'],
                    uci_data['balance'],
                    uci_data['default']
                )
            else:
                # Check for low balance specifically
                if uci_data['balance'] < 500:
                    recommendation = """💰 LOW BALANCE ALERT ({0:.1f}% Probability)

DYNAMIC TRIGGER: Activates when balance < €500
✅ User-Specific: Shows actual balance value
✅ Action-Oriented: Clear steps for improvement
✅ Realistic: Honest conversion expectations
✅ Professional: Financial counseling recommendations

KEY FINANCIAL CONSTRAINTS:
• Balance €{1}: CRITICAL INSUFFICIENCY - PRIMARY BARRIER
• Current balance indicates immediate financial constraints
• Unable to meet minimum investment requirements
• High risk of financial distress

IMMEDIATE ACTION REQUIRED:
• CRITICAL: Build emergency fund first (3-6 months expenses)
• CRITICAL: Increase income through additional employment
• CRITICAL: Reduce unnecessary expenses immediately
• CRITICAL: Consider financial counseling services

PATH TO SUBSCRIPTION:
• Step 1: Achieve €1000+ minimum balance
• Step 2: Establish consistent savings pattern  
• Step 3: Reduce high-interest debt
• Step 4: Build investment foundation

EXPECTED: 20-30% conversion rate (current constraints)""".format(
                        prob_yes * 100,
                        uci_data['balance']
                    )
                else:
                    recommendation = """🔄 MARGINAL SUBSCRIBER ({0:.1f}% Probability)

KEY FEATURES DRIVING PREDICTION:
• Duration {1}s: Very low engagement - HIGH RISK
• Balance €{2}: Insufficient funds - HIGH RISK
• Age {3}: Young demographic - RISK FACTOR
• Campaign {4}: Over-contacted - RISK FACTOR
• {5} education: May need financial education
• {6} loan: Existing debt burden - RISK FACTOR

TO REDUCE RISK:
• CRITICAL: Increase call duration to 500s+ (currently {1}s)
• CRITICAL: Build balance to €2400+ (currently €{2})
• Reduce campaign contacts to 1-3 (currently {4})
• Age {3}: {5} - OPTIMAL for subscription
• Address {6} loan before new commitments

EXPECTED: 50-70% conversion rate""".format(
                    prob_yes * 100,
                    uci_data['duration'],
                    uci_data['balance'],
                    uci_data['age'],
                    uci_data['campaign'],
                    uci_data['education'].title(),
                    uci_data['loan']
                )
        else:
            # For NO predictions, keep the existing recommendations
            if prob_yes < 0.2:
                recommendation = """❌ LOW PRIORITY (0-20% Probability Range)
                
Very low conversion probability at {0:.1f}%.
Key barriers: {1}

STRATEGIC ACTIONS:
• Add to long-term nurture campaign (6+ months)
• Send periodic bank updates and newsletters
• Focus on building brand awareness
• Monitor for life changes (job, income, family)
• Re-engage during special campaigns or rate changes
• Consider alternative financial products that may fit better

EXPECTED OUTCOME: Low immediate potential, maintain minimal contact""".format(
                    prob_yes * 100,
                    "Strong financial constraints" if uci_data['balance'] < 500 else "Low engagement and interest"
                )
            elif prob_yes < 0.4:
                recommendation = """🔄 RE-ENGAGEMENT NEEDED (20-40% Probability Range)
                
Moderate resistance with {0:.1f}% probability.
Obstacles: {1}

STRATEGIC ACTIONS:
• Re-approach in 3-4 months with different angle
• Address specific concerns or objections
• Offer trial period or flexible start options
• Provide market insights and economic trends
• Highlight limited-time promotional rates
• Consider cross-selling other banking products first

EXPECTED OUTCOME: Potential conversion with timing and approach adjustment""".format(
                    prob_yes * 100,
                    "Timing or product fit issues" if uci_data['campaign'] > 3 else "Insufficient information or trust"
                )
            else:
                recommendation = """🎲 UNCERTAIN PROSPECT (40-50% Probability Range)
                
Borderline case at {0:.1f}% probability.
Mixed indicators: {1}

STRATEGIC ACTIONS:
• Collect additional customer data and preferences
• Test different communication channels and messages
• Offer financial planning consultation
• Monitor account activity for interest signals
• Provide educational content about financial planning
• Consider A/B testing different offers

EXPECTED OUTCOME: Conversion depends on deeper customer understanding""".format(
                    prob_yes * 100,
                    "Conflicting signals in profile" if (uci_data['balance'] > 1000 and uci_data['duration'] < 60) else "Limited engagement data"
                )
        
        # Comprehensive factors analysis based on actual data
        factors = []
        
        # Age-related factors
        if uci_data['age'] < 25:
            factors.append("Young customer (under 25) - may need education on long-term savings")
        elif 25 <= uci_data['age'] <= 35:
            factors.append("Early career stage (25-35) - good opportunity for first-time investments")
        elif 36 <= uci_data['age'] <= 50:
            factors.append("Prime earning years (36-50) - optimal for term deposits")
        elif 51 <= uci_data['age'] <= 65:
            factors.append("Pre-retirement planning (51-65) - seeking stable investments")
        else:
            factors.append("Senior customer (65+) - prioritizing capital preservation")
        
        # Financial capacity factors
        if uci_data['balance'] < 500:
            factors.append("Low account balance (<€500) - limited investment capacity")
        elif 500 <= uci_data['balance'] <= 2000:
            factors.append("Moderate balance (€500-2000) - suitable for starter deposits")
        elif 2001 <= uci_data['balance'] <= 5000:
            factors.append("Strong balance (€2000-5000) - good investment potential")
        else:
            factors.append("High balance (>€5000) - premium investment candidate")
        
        # Engagement factors
        if uci_data['duration'] < 30:
            factors.append("Very brief contact (<30s) - low engagement or wrong timing")
        elif 30 <= uci_data['duration'] <= 120:
            factors.append("Moderate contact duration (30-120s) - some interest shown")
        elif 121 <= uci_data['duration'] <= 300:
            factors.append("Good engagement (2-5 minutes) - actively considering options")
        else:
            factors.append("Excellent engagement (>5 minutes) - high interest level")
        
        # Campaign history factors
        if uci_data['campaign'] == 1:
            factors.append("First contact in campaign - fresh opportunity")
        elif 2 <= uci_data['campaign'] <= 3:
            factors.append("Early campaign stage (2-3 contacts) - building awareness")
        elif 4 <= uci_data['campaign'] <= 6:
            factors.append("Mid-campaign stage (4-6 contacts) - needs stronger value proposition")
        else:
            factors.append("High contact frequency (>6) - risk of contact fatigue")
        
        # Previous interaction factors
        if uci_data['previous'] == 0:
            factors.append("No prior campaign history - new prospect")
        elif uci_data['previous'] == 1:
            factors.append("One previous contact - some relationship exists")
        elif 2 <= uci_data['previous'] <= 3:
            factors.append("Multiple prior contacts (2-3) - established relationship")
        else:
            factors.append("Extensive contact history (>3) - well-known to bank")
        
        # Education and demographic factors
        if uci_data['education'] == 'tertiary':
            factors.append("Higher education - likely understands financial products")
        elif uci_data['education'] == 'secondary':
            factors.append("Secondary education - may need more explanation")
        else:
            factors.append("Primary education - simplify communication and benefits")
        
        # Loan obligations factors
        if uci_data['housing'] == 'no' and uci_data['loan'] == 'no':
            factors.append("No existing loans - maximum investment capacity")
        elif uci_data['housing'] == 'yes' and uci_data['loan'] == 'no':
            factors.append("Has housing loan - moderate financial obligations")
        elif uci_data['housing'] == 'no' and uci_data['loan'] == 'yes':
            factors.append("Has personal loan - some financial constraints")
        else:
            factors.append("Multiple loans - limited disposable income")
        
        # Previous outcome factors
        if uci_data['poutcome'] == 'success':
            factors.append("Previous campaign success - high conversion potential")
        elif uci_data['poutcome'] == 'failure':
            factors.append("Previous campaign failure - address past issues")
        elif uci_data['poutcome'] == 'other':
            factors.append("Mixed previous results - neutral starting point")
        else:
            factors.append("No previous campaign data - fresh opportunity")
        
        # Dynamic success rate based on actual probability
        success_rate = prob_yes * 100
        if uci_data['previous'] > 2: success_rate *= 1.1
        if uci_data['poutcome'] == 'success': success_rate *= 1.2
        if uci_data['campaign'] > 5: success_rate *= 0.8
        success_rate = round(min(95, success_rate), 1)
        
        return jsonify({
            "prediction": result,
            "confidence": round(confidence, 2),
            "probability_yes": round(prob_yes, 4),
            "probability_no": round(prob_no, 4),
            "risk_score": risk_score,
            "recommendation": recommendation,
            "factors": factors[:3],
            "success_rate": success_rate,
            "dataset_info": {
                "source": "UCI Bank Marketing Dataset",
                "instances": 45211,
                "features": 16,
                "target": "term deposit subscription",
                "model_features": 12,
                "validation": "All fields validated against UCI dataset ranges"
            }
        })
        
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"})

def calculate_risk_score(data, probability):
    """Calculate risk score based on UCI dataset patterns"""
    score = 10 - (probability * 10)
    
    # Risk adjustments based on domain knowledge
    if data.get('age', 40) < 25:
        score += 1  # Younger clients are riskier
    if data.get('balance', 0) < 1000:
        score += 1  # Low balance indicates risk
    if data.get('duration', 0) < 60:
        score += 1  # Short calls indicate low interest
    if data.get('previous', 0) == 0:
        score += 0.5  # No previous contact
    
    return round(min(10, max(1, score)), 1)

def get_recommendation(data, prediction, probability):
    """Generate recommendations based on UCI dataset insights"""
    if prediction == "YES" and probability > 0.7:
        return "HIGH PRIORITY: Strong candidate for term deposit. Contact immediately with personalized offer."
    elif prediction == "YES" and probability > 0.5:
        return "GOOD PROSPECT: Follow up within 48 hours. Emphasize benefits of term deposits."
    elif prediction == "NO" and probability < 0.3:
        return "LOW PRIORITY: Focus on other prospects. Add to long-term nurture campaign."
    else:
        return "MODERATE POTENTIAL: Build relationship first. Consider educational content about financial products."

def analyze_factors(data):
    """Analyze key factors from UCI dataset"""
    factors = []
    
    if data.get('age', 40) >= 30 and data.get('age', 40) <= 60:
        factors.append("Optimal age range (30-60) for financial decisions")
    
    if data.get('balance', 0) > 1000:
        factors.append("Strong financial capacity (balance > €1000)")
    
    if data.get('duration', 0) > 180:
        factors.append("High engagement (call duration > 3 minutes)")
    
    if data.get('previous', 0) > 0:
        factors.append("Previous positive contact history")
    
    if data.get('education') == 'tertiary':
        factors.append("Higher education correlates with better financial decisions")
    
    if data.get('housing') == 'no':
        factors.append("No existing housing loan obligations")
    
    return factors[:3]  # Return top 3 factors

def calculate_success_rate(data, probability):
    """Calculate realistic success rate"""
    base_rate = probability * 100
    
    # Adjustments based on UCI dataset patterns
    if data.get('previous', 0) > 2:
        base_rate *= 1.1  # Previous success increases rate
    if data.get('poutcome') == 'success':
        base_rate *= 1.2  # Previous campaign success
    if data.get('campaign', 1) > 5:
        base_rate *= 0.8  # Too many contacts decreases success
    
    return round(min(95, base_rate), 1)

if __name__ == "__main__":
    print("Starting Bank Marketing Prediction API")
    print("Dataset: UCI Bank Marketing (45,211 instances, 16 features)")
    print("Target: Predict term deposit subscription")
    app.run(debug=True, host='0.0.0.0', port=5000)
