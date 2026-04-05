import streamlit as st
from datetime import datetime

def temps_restant(date_cible):
    maintenant = datetime.now()
    delta = date_cible - maintenant

    if delta.total_seconds() < 0:
        return "La date est déjà passée."

    jours = delta.days
    secondes_restantes = delta.seconds

    heures = secondes_restantes // 3600
    minutes = (secondes_restantes % 3600) // 60
    secondes = secondes_restantes % 60

    return f"{jours} jours, {heures} heures, {minutes} minutes, {secondes} secondes"

st.title("Bisous")

date_str = st.text_input("Date cible", "2026-04-30 05:30:00")

if st.button("Calculer"):
    try:
        date_cible = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
        st.success(temps_restant(date_cible))
    except:
        st.error("Format invalide")
