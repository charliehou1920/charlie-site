---
title: "Building TME-VI: Lessons from Deploying a Single-cell GNN"
date: "2026-05-23"
category: "AIVC"
excerpt: "What I learned building and deploying an uncertainty-aware graph neural network for immunotherapy response prediction — from scVI embeddings to a live HuggingFace Space."
readTime: "8 min"
---

## Overview

TME-VI started as a question: can we predict which melanoma patients will respond to anti-PD-1 immunotherapy, using only single-cell RNA-seq data from their tumor microenvironment?

## The Core Idea

The tumor microenvironment is an ecosystem. Immune cells don't act in isolation — they form neighborhoods, communicate through ligand-receptor interactions, and collectively determine whether a tumor is "hot" or "cold" to immunotherapy.

A graph neural network is the natural tool here. Cells become nodes, spatial and transcriptomic proximity becomes edges, and the GAT learns which neighborhoods are predictive of response.

## What Worked

**scVI as the universal representation** was the right call. The variational autoencoder compresses 17,000+ gene dimensions into a 10-dimensional latent space that captures biological variation while correcting batch effects across patients.

**Monte Carlo Dropout for uncertainty** turned out to be more than a technical nicety. The model's uncertainty correlates with biological ambiguity — high-entropy predictions cluster around transitional cell states and mixed phenotypes that are genuinely hard to classify.

## What Didn't Work

Joint cell-patient supervision failed. Trying to optimize cell-level and patient-level loss simultaneously caused the model to collapse toward the majority class. Single-task cell-level supervision with post-hoc patient aggregation was the right approach.

## The Deployment Stack

FastAPI backend + Streamlit frontend in a single Docker container on HuggingFace Spaces. The LLM report layer uses Claude API streaming to translate GNN outputs into clinical language.

## Next Steps

32 patients is a hard ceiling. The next step is pan-cancer extension — zero-shot transfer to NSCLC using CELLxGENE Census.